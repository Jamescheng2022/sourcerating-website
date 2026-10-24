export interface HostedMembershipConfig {
  enabled?: string;
  url?: string;
}

// Structural validation only: activation still requires a separately approved
// SourceRating offer, seller eligibility, delivery and exact product destination.
// No client input, network request, order or entitlement is involved here.
export function resolveHostedMembershipUrl(config: HostedMembershipConfig): string | null {
  if (config.enabled !== "true" || typeof config.url !== "string") return null;
  if (/[\s\\]/.test(config.url)) return null;

  // Inspect the raw form before URL parsing can normalize backslashes, dot
  // segments, encoded paths, whitespace or ports into an apparently valid URL.
  const match = config.url.match(
    /^https:\/\/((?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)?gumroad\.com)\/l\/([a-zA-Z0-9_-]+)(?:\?[^\s#]*)?(?:#[^\s]*)?$/,
  );
  if (!match) return null;

  const [, host, product] = match;
  const normalizedProduct = product.toLowerCase().replace(/[-_]/g, "");
  const normalizedHost = host.replace(/[-_.]/g, "");
  if (
    normalizedProduct === "fimaf" ||
    normalizedProduct.includes("nogodownsme") ||
    normalizedProduct.includes("nogodwinsme") ||
    normalizedHost.includes("nogodownsme") ||
    normalizedHost.includes("nogodwinsme")
  ) return null;

  const target = new URL(`https://${host}/l/${product}`);
  target.searchParams.set("wanted", "true");
  return target.href;
}

export function createHostedMembershipResponse(config: HostedMembershipConfig): Response {
  const target = resolveHostedMembershipUrl(config);
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Referrer-Policy": "no-referrer",
    "X-Robots-Tag": "noindex, nofollow",
  });
  if (target) {
    headers.set("Location", target);
    return new Response(null, { status: 303, headers });
  }
  headers.set("Content-Type", "text/plain; charset=utf-8");
  return new Response("Membership checkout is unavailable.", { status: 503, headers });
}
