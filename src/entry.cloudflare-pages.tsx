import {
  createQwikCity,
  type PlatformCloudflarePages,
} from "@builder.io/qwik-city/middleware/cloudflare-pages";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";
import { applySecurityHeaders } from "./securityHeaders";

const qwikCityFetch = createQwikCity({ render, qwikCityPlan });

const fetch: typeof qwikCityFetch = async (request, env, ctx) => {
  const response = await qwikCityFetch(request, env, ctx);
  return applySecurityHeaders(response);
};

export { fetch };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- declaration merging with Qwik City's global platform type
  interface QwikCityPlatform extends PlatformCloudflarePages {}
}
