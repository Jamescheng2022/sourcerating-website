import "server-only";

const MAX_BODY_BYTES = 24_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface GuardFailure {
  status: 403 | 413 | 429;
  error: string;
  reason: "cross_origin" | "payload_too_large" | "rate_limited";
}

const globalRateLimits = globalThis as typeof globalThis & {
  __sourceRatingRateLimits?: Map<string, RateLimitEntry>;
};

const rateLimits =
  globalRateLimits.__sourceRatingRateLimits ?? new Map<string, RateLimitEntry>();

globalRateLimits.__sourceRatingRateLimits = rateLimits;

function clientKey(request: Request, namespace: string) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || request.headers.get("x-real-ip") || "unknown";
  return `${namespace}:${ip}`;
}

function isRateLimited(request: Request, namespace: string) {
  const now = Date.now();
  const key = clientKey(request, namespace);
  const existing = rateLimits.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  existing.count += 1;
  rateLimits.set(key, existing);

  if (rateLimits.size > 2_000) {
    for (const [entryKey, entry] of rateLimits) {
      if (entry.resetAt <= now) rateLimits.delete(entryKey);
    }
  }

  return existing.count > RATE_LIMIT_MAX_REQUESTS;
}

export function guardPublicFormRequest(
  request: Request,
  namespace: string,
): GuardFailure | null {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return {
      status: 413,
      error: "The submitted form is too large.",
      reason: "payload_too_large",
    };
  }

  const origin = request.headers.get("origin");
  if (origin) {
    const requestUrl = new URL(request.url);
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const requestHost = forwardedHost || request.headers.get("host") || requestUrl.host;
    const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const requestProtocol = forwardedProtocol || requestUrl.protocol.replace(":", "");

    let sameOrigin = false;
    try {
      const submittedOrigin = new URL(origin);
      sameOrigin =
        submittedOrigin.host === requestHost &&
        submittedOrigin.protocol === `${requestProtocol}:`;
    } catch {
      sameOrigin = false;
    }

    if (!sameOrigin) {
      return {
        status: 403,
        error: "This form must be submitted from Source Rating.",
        reason: "cross_origin",
      };
    }
  }

  if (isRateLimited(request, namespace)) {
    return {
      status: 429,
      error: "Too many requests. Please wait a few minutes and try again.",
      reason: "rate_limited",
    };
  }

  return null;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isSpamTrapFilled(body: unknown) {
  if (!body || typeof body !== "object") return false;
  const value = (body as Record<string, unknown>).fax_number;
  return typeof value === "string" && value.trim().length > 0;
}
