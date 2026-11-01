import {
  createQwikCity,
  type PlatformCloudflarePages,
} from "@builder.io/qwik-city/middleware/cloudflare-pages";
import qwikCityPlan from "@qwik-city-plan";
import render from "./entry.ssr";

const fetch = createQwikCity({ render, qwikCityPlan });

export { fetch };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- declaration merging with Qwik City's global platform type
  interface QwikCityPlatform extends PlatformCloudflarePages {}
}
