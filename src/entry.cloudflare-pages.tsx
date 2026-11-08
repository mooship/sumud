import {
  createQwikCity,
  type PlatformCloudflarePages,
} from "@builder.io/qwik-city/middleware/cloudflare-pages";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";

const fetch = createQwikCity({ render, qwikCityPlan });

export { fetch };

declare global {
  // Declaration merging with Qwik City's global platform type.
  interface QwikCityPlatform extends PlatformCloudflarePages {}
}
