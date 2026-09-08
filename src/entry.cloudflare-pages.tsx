import {
  createQwikCity,
  type PlatformCloudflarePages,
} from "@builder.io/qwik-city/middleware/cloudflare-pages";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";

const qwikCityFetch = createQwikCity({ render, qwikCityPlan });

/**
 * Security headers that public/_headers applies to static asset responses.
 * Responses rendered by this Worker (the 404 page, or anything not
 * prerendered at build time) bypass _headers entirely, so the same set is
 * applied here to keep the two paths consistent.
 */
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests",
};

const fetch: typeof qwikCityFetch = async (request, env, ctx) => {
  const response = await qwikCityFetch(request, env, ctx);
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

export { fetch };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- declaration merging with Qwik City's global platform type
  interface QwikCityPlatform extends PlatformCloudflarePages {}
}
