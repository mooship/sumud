/**
 * Security headers that `public/_headers` applies to static asset responses.
 * Responses rendered by the Cloudflare Pages Worker (the 404 page, or
 * anything not prerendered at build time) bypass `_headers` entirely, so the
 * same set is applied via {@link applySecurityHeaders} to keep the two paths
 * consistent. Kept dependency-free from `@builder.io/qwik-city` so it can be
 * unit tested without pulling in the whole app's route plan.
 */
export const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests",
};

/** Applies {@link SECURITY_HEADERS} to a response, preserving its body, status, and any headers
 *  it already set. */
export function applySecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
