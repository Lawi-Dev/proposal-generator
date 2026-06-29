import { createRemoteJWKSet, jwtVerify, SignJWT } from "jose";

const DEFAULT_TOOL_KEY = "proposal-generator";
const DEFAULT_HUB_ISSUER = "https://lawi-hub.lawi.workers.dev";
const CALLBACK_PATH = "/auth/callback";
const DEFAULT_COOKIE_NAME = "proposal_generator_session";
const SESSION_ISSUER = "lawi-proposal-generator";
const DEFAULT_SESSION_MAX_AGE_SECONDS = 60 * 60;

type Env = {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  HUB_ISSUER?: string;
  HUB_JWKS_URL?: string;
  HUB_LAUNCH_URL?: string;
  SESSION_SECRET?: string;
  SESSION_COOKIE_NAME?: string;
  SESSION_MAX_AGE_SECONDS?: string;
  TOOL_KEY?: string;
};

type Config = {
  cookieName: string;
  hubIssuer: string;
  hubJwksUrl: string;
  hubLaunchUrl: string;
  sessionMaxAgeSeconds: number;
  toolKey: string;
};

const hubJwksByUrl = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

function cleanUrl(value: string) {
  return value.trim().replace(/\/+$/, "");
}

function readPositiveInteger(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function getConfig(env: Env): Config {
  const toolKey = env.TOOL_KEY?.trim() || DEFAULT_TOOL_KEY;
  const hubIssuer = cleanUrl(env.HUB_ISSUER || DEFAULT_HUB_ISSUER);

  return {
    cookieName: env.SESSION_COOKIE_NAME?.trim() || DEFAULT_COOKIE_NAME,
    hubIssuer,
    hubJwksUrl: env.HUB_JWKS_URL?.trim() || `${hubIssuer}/.well-known/jwks.json`,
    hubLaunchUrl: env.HUB_LAUNCH_URL?.trim() || `${hubIssuer}/tools/${toolKey}/launch`,
    sessionMaxAgeSeconds: readPositiveInteger(
      env.SESSION_MAX_AGE_SECONDS,
      DEFAULT_SESSION_MAX_AGE_SECONDS,
    ),
    toolKey,
  };
}

function getHubJwks(jwksUrl: string) {
  let hubJwks = hubJwksByUrl.get(jwksUrl);
  if (!hubJwks) {
    hubJwks = createRemoteJWKSet(new URL(jwksUrl));
    hubJwksByUrl.set(jwksUrl, hubJwks);
  }
  return hubJwks;
}

function getSessionSecret(env: Env) {
  if (!env.SESSION_SECRET) {
    throw new Error("Missing SESSION_SECRET.");
  }
  return new TextEncoder().encode(env.SESSION_SECRET);
}

function readCookie(request: Request, name: string) {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  for (const part of cookieHeader.split(";")) {
    const [rawName, ...rawValue] = part.trim().split("=");
    if (rawName === name) {
      return decodeURIComponent(rawValue.join("="));
    }
  }

  return null;
}

function buildSessionCookie(config: Config, value: string, maxAge = config.sessionMaxAgeSeconds) {
  return [
    `${config.cookieName}=${encodeURIComponent(value)}`,
    `Max-Age=${maxAge}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
  ].join("; ");
}

function clearSessionCookie(config: Config) {
  return buildSessionCookie(config, "", 0);
}

function redirect(location: string, headers?: HeadersInit) {
  return new Response(null, {
    status: 302,
    headers: {
      ...headers,
      Location: location,
    },
  });
}

async function verifyHubLaunchToken(token: string, config: Config) {
  const { payload } = await jwtVerify(token, getHubJwks(config.hubJwksUrl), {
    issuer: config.hubIssuer,
    audience: config.toolKey,
    algorithms: ["ES256"],
  });

  if (payload.toolKey !== config.toolKey) {
    throw new Error("Invalid toolKey claim.");
  }

  return payload;
}

async function createSession(env: Env, config: Config, hubSubject?: string) {
  return new SignJWT({
    toolKey: config.toolKey,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(SESSION_ISSUER)
    .setAudience(config.toolKey)
    .setSubject(hubSubject ?? config.toolKey)
    .setIssuedAt()
    .setExpirationTime(`${config.sessionMaxAgeSeconds}s`)
    .setJti(crypto.randomUUID())
    .sign(getSessionSecret(env));
}

async function hasValidSession(request: Request, env: Env, config: Config) {
  const session = readCookie(request, config.cookieName);
  if (!session) return false;

  try {
    const { payload } = await jwtVerify(session, getSessionSecret(env), {
      issuer: SESSION_ISSUER,
      audience: config.toolKey,
      algorithms: ["HS256"],
    });

    return payload.toolKey === config.toolKey;
  } catch {
    return false;
  }
}

async function handleCallback(request: Request, env: Env, config: Config) {
  if (request.method !== "GET") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "GET" },
    });
  }

  const token = new URL(request.url).searchParams.get("token");
  if (!token) {
    return redirect(config.hubLaunchUrl, { "Set-Cookie": clearSessionCookie(config) });
  }

  try {
    const payload = await verifyHubLaunchToken(token, config);
    const session = await createSession(env, config, payload.sub);
    return redirect("/", { "Set-Cookie": buildSessionCookie(config, session) });
  } catch (error) {
    console.error("Failed to complete Hub auth callback.", error);
    return redirect(config.hubLaunchUrl, { "Set-Cookie": clearSessionCookie(config) });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const config = getConfig(env);

    if (url.pathname === CALLBACK_PATH) {
      return handleCallback(request, env, config);
    }

    if (await hasValidSession(request, env, config)) {
      return env.ASSETS.fetch(request);
    }

    return redirect(config.hubLaunchUrl, { "Set-Cookie": clearSessionCookie(config) });
  },
};
