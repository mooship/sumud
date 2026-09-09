/*
 * WHAT IS THIS FILE?
 *
 * It's the bridge between vite dev server and adapter's preview server for handling all pages
 * server-side rendering (SSR).
 *
 * Feel free to modify this file, but don't remove it as it's needed for `npm run preview`.
 */
import { createQwikCity } from "@builder.io/qwik-city/middleware/node";
import qwikCityPlan from "@qwik-city-plan";
import { manifest } from "@qwik-client-manifest";
import render from "./entry.ssr";

const { router, notFound } = createQwikCity({
  render,
  qwikCityPlan,
  manifest,
});

export default function handlePreviewRequest(
  req: import("node:http").IncomingMessage,
  res: import("node:http").ServerResponse,
  next: (err?: unknown) => void,
) {
  router(req, res, () => notFound(req, res, next));
}
