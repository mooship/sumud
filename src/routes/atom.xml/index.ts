import type { RequestHandler } from "@builder.io/qwik-city";
import {
  buildAtomFeed,
  FEED_CACHE_CONTROL,
  getFeedItems,
} from "~/content/feed";

export const onGet: RequestHandler = async ({
  send,
  headers,
  cacheControl,
}) => {
  cacheControl(FEED_CACHE_CONTROL);
  headers.set("Content-Type", "application/atom+xml; charset=utf-8");
  send(200, buildAtomFeed(getFeedItems(), new Date()));
};
