import type { RequestHandler } from "@builder.io/qwik-city";
import { buildAtomFeed, getFeedItems } from "~/content/feed";

export const onGet: RequestHandler = async ({
  send,
  headers,
  cacheControl,
}) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 60 * 60,
  });
  headers.set("Content-Type", "application/atom+xml; charset=utf-8");
  send(200, buildAtomFeed(getFeedItems(), new Date()));
};
