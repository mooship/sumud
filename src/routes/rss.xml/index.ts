import type { RequestHandler } from "@builder.io/qwik-city";
import { buildRssFeed, FEED_CACHE_CONTROL, getFeedItems } from "~/content/feed";

export const onGet: RequestHandler = async ({
  send,
  headers,
  cacheControl,
}) => {
  cacheControl(FEED_CACHE_CONTROL);
  headers.set("Content-Type", "application/rss+xml; charset=utf-8");
  send(200, buildRssFeed(getFeedItems(), new Date()));
};
