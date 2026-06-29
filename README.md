# Lawi Proposal Generator

Static Vite proposal generator served through a Cloudflare Worker auth layer.
The React app remains client-side; the Worker protects all app routes and
assets with Lawi Hub launch authentication.

## Authentication

The Hub launches this tool at:

```text
https://lawi-hub.lawi.workers.dev/tools/proposal-generator/launch
```

The Hub redirects back to this Worker at:

```text
https://lawi-proposal-generator.lawi.workers.dev/auth/callback?token=...
```

The Worker verifies the Hub JWT against:

```text
https://lawi-hub.lawi.workers.dev/.well-known/jwks.json
```

After verification, it creates a local `proposal_generator_session` cookie for
this tool only. Direct visits without a valid local session redirect back to the
Hub launch URL. The app does not rely on shared cookies across `workers.dev`
subdomains.

## Local Development

Install dependencies:

```bash
bun install
```

Run the Vite UI directly, without the Worker auth wrapper:

```bash
bun run dev
```

This command is useful for UI work only. It does not apply Hub authentication.

Run the Worker auth wrapper locally:

```bash
cp .env.example .dev.vars
bun run dev:worker
```

Edit `.dev.vars` to switch between the deployed Hub and a local Hub. For local
Hub testing, set `HUB_ISSUER` to the same value the Hub uses to sign launch
tokens, for example `http://localhost:5173`. Direct local visits should redirect
to the configured Hub launch URL unless a valid local session cookie has been
created.

## Deployment

Set the Worker session secret once in Cloudflare:

```bash
bunx wrangler secret put SESSION_SECRET
```

Build and deploy:

```bash
bun run build
bunx wrangler deploy
```

The GitHub Actions deploy workflow also runs `bun install --frozen-lockfile`,
`bun run build`, and Wrangler deploy on pushes to `main`.

## Checks

```bash
bun run build
```

There is no lint script configured in `package.json` yet.
