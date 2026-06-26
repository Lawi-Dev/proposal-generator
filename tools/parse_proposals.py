# -*- coding: utf-8 -*-
"""Converte o texto do Word consolidado em proposals.json estruturado."""
import re, json, sys

txt = open(sys.argv[1], encoding="utf-8").read()
lines = txt.split("\n")

# Índices dos cabeçalhos "Lawi | ..."
heads = [i for i, l in enumerate(lines) if l.startswith("Lawi |")]
heads.append(len(lines))

CUR = r"(US\$|U\$S|USD|U\$D|BRL|R\$|€|EUR)"
FEE_KW = re.compile(r"(valor [úu]nico|one-time fee|fixed fee|tarifa fija|honorário[s]? fixo|fixed fee|valor fijo)", re.I)

def detect_lang(block):
    if "Where to Find Us" in block: return "en"
    if "Dónde encontrarnos" in block: return "es"
    if "Onde nos encontrar" in block: return "pt"
    return "es"

def detect_key(title):
    t = title.lower()
    if "s.a.s" in t or "sas" in t: return ("argentina", "sas", "default")
    if "llc" in t: return ("usa", "llc", "default")
    if "spain" in t or "españa" in t or "espanha" in t: return ("espana", "soft-landing", "default")
    if "argentina" in t: return ("argentina", "soft-landing", "default")
    if "brazil" in t or "brasil" in t or "jurídica" in t or "corporate" in t:
        return ("brasil", "soft-landing", "persona-juridica")
    return ("outros", "outros", "default")

# Marcadores de seções "institucionais" (encerram o corpo)
STOP = ["Condiciones Generales", "Condições Gerais", "General Terms",
        "Equipos que ya acompañamos", "Equipes que já acompanhamos", "Teams We Have"]
COND_H = ["Condiciones Generales", "Condições Gerais", "General Terms and Conditions", "General Terms"]
TEAM_H = ["Equipos que ya acompañamos", "Equipes que já acompanhamos", "Teams We Have Already Accompanied"]
OBJ_H = ["Objetivo", "Objective", "Scope of the Proposal", "Alcance"]

def is_heading(line):
    # subtítulo numerado ("2. ...", "2.1. ...") é título mesmo terminando em ponto
    if re.match(r"^\d+(\.\d+)*\.\s", line) and len(line) < 85: return True
    if len(line) > 70: return False
    if line.endswith(('.', ':', ';', ',')): return False
    # Heading: poucas palavras, sem terminar em pontuação
    return len(line.split()) <= 9

def group_blocks(seg):
    """Agrupa linhas em blocos separados por linha em branco."""
    groups, cur = [], []
    for l in seg:
        if l.strip() == "":
            if cur: groups.append(cur); cur = []
        else:
            cur.append(l.strip())
    if cur: groups.append(cur)
    return groups

NUM = re.compile(r"^\d+(\.\d+)*\.\s+\S")
MONEY = re.compile(r"(US\$|U\$S|USD|€|EUR|BRL|R\$)\s?[\d.,]+", re.I)

def lines_to_blocks(ls):
    """Converte linhas de uma seção em blocos. Heurísticas:
    - linha numerada curta ("1.", "2.1.") => subtítulo (h)
    - linha terminando em ':' inicia uma lista (bullets)
    - parágrafo com valor monetário => destaque (strong)"""
    blocks, i = [], 0
    while i < len(ls):
        line = ls[i]
        if NUM.match(line) and len(line) < 90:
            blocks.append({"t": "h", "text": line}); i += 1; continue
        if line.endswith(":") and i + 1 < len(ls):
            blocks.append({"t": "p", "text": line}); i += 1
            items = []
            while i < len(ls) and not ls[i].endswith(":") and not (NUM.match(ls[i]) and len(ls[i]) < 90):
                items.append(ls[i]); i += 1
            if items: blocks.append({"t": "ul", "items": items})
        else:
            b = {"t": "p", "text": line}
            if MONEY.search(line):
                b["strong"] = True
            blocks.append(b); i += 1
    return blocks

out = {}
for h in range(len(heads) - 1):
    block_lines = lines[heads[h]:heads[h + 1]]
    block = "\n".join(block_lines)
    lang = detect_lang(block)
    title_full = block_lines[0].replace("Lawi |", "").strip()
    modality = ""
    if "—" in title_full:
        coverTitle, modality = [s.strip() for s in title_full.split("—", 1)]
    else:
        coverTitle = title_full
    jur, svc, mod = detect_key(title_full)

    # localizar linha de data e de cidade
    city = ""
    date_idx = None
    # encontra a linha da data (Data/Fecha/Date), mesmo prefixada por "Para:"
    for i, l in enumerate(block_lines):
        if re.search(r"(Data|Fecha|Date)\s*:", l):
            date_idx = i
            m = re.search(r"\|\s*(.+)$", l)
            if m: city = m.group(1).strip()
            break

    # corpo: das linhas após a data até o cabeçalho de Condições
    body = block_lines[(date_idx + 1) if date_idx is not None else 1:]
    # cortar em Condições
    cond_start = None
    for i, l in enumerate(body):
        if any(l.strip().startswith(c) for c in COND_H):
            cond_start = i; break
    team_start = None
    for i, l in enumerate(body):
        if any(l.strip().startswith(c) for c in TEAM_H):
            team_start = i; break

    body_main = body[:cond_start] if cond_start is not None else body
    cond_lines = body[cond_start:team_start] if (cond_start is not None and team_start is not None) else []

    groups = group_blocks(body_main)

    # overview = 1º grupo (heading + intro); introBullets = 2º grupo se for lista
    overviewHeading = groups[0][0] if groups else coverTitle
    intro = groups[0][1:] if groups and len(groups[0]) > 1 else []
    introBullets = []
    gi = 1
    if len(groups) > 1:
        g = groups[1]
        # se 1º item termina com ':' é "Em especial..."; bullets são o resto
        if g and g[0].endswith(":"):
            introBullets = g[1:]; gi = 2
        elif all(len(x) < 90 for x in g) and not any(x.endswith(".") for x in g[:1]):
            introBullets = g; gi = 2

    body_groups = groups[gi:]

    # localizar grupo do preço (1º grupo com FEE_KW ou moeda + 'único/fixed')
    def is_fee_line(l):
        return bool(FEE_KW.search(l) or (re.search(CUR, l) and re.search(r"[úu]nico|fixed|fija|fixo", l, re.I)))
    def split_includes(rest):
        """De um grupo, separa (título, itens). Os itens são as linhas APÓS a
        linha intro que termina em ':' (ex.: '...incluyen:'). O que vem antes
        do ':' é o título (descarta a linha intro)."""
        colon = next((i for i, x in enumerate(rest) if x.endswith(":")), None)
        if colon is not None:
            title = rest[0] if colon > 0 else ""
            return title, rest[colon + 1:]
        title = rest[0] if is_heading(rest[0]) else ""
        return title, (rest[1:] if title else rest)

    fee_gi, value, includes, price_title = None, "", [], ""
    for idx, g in enumerate(body_groups):
        fee_in = [l for l in g if is_fee_line(l)]
        if fee_in:
            fee_gi = idx
            value = fee_in[0]
            same_above = [l for l in g if not is_fee_line(l)]
            if same_above:
                price_title, includes = split_includes(same_above)
            elif idx > 0:
                pg = body_groups[idx - 1]
                price_title, includes = split_includes(pg)
                body_groups[idx - 1] = []  # consumir
            break

    # demais grupos = seções (excluindo o grupo do preço)
    sections = []
    for idx, g in enumerate(body_groups):
        if idx == fee_gi or not g:
            continue
        head = g[0] if is_heading(g[0]) else ""
        rest = g[1:] if head else g
        sections.append({"heading": head, "blocks": lines_to_blocks(rest)})

    # mescla órfãos: seção sem título com 1 bloco curto é continuação da anterior
    # (evita páginas quase vazias com um parágrafo solto)
    merged = []
    for s in sections:
        if (not s["heading"] and len(s["blocks"]) <= 1 and merged):
            merged[-1]["blocks"].extend(s["blocks"])
        else:
            merged.append(s)
    sections = merged

    # condições -> bullets
    conditions = []
    if cond_lines:
        for l in cond_lines[1:]:
            if l.strip(): conditions.append(l.strip())

    key = f"{jur}|{svc}|{mod}|{lang}"
    out[key] = {
        "coverTitle": coverTitle, "modality": modality, "city": city,
        "overviewHeading": overviewHeading, "intro": intro, "introBullets": introBullets,
        "sections": sections,
        "priceTitle": price_title or overviewHeading,
        "priceIncludes": includes, "priceValue": value,
        "conditions": conditions,
    }

json.dump(out, open(sys.argv[2], "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("propostas:", len(out))
for k in out: print(" -", k)
