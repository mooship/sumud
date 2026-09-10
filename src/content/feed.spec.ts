import { describe, expect, it } from "vitest";
import { HISTORY_CHAPTERS } from "./history-chapters";
import { NAV_ITEMS } from "./nav";
import {
  buildAtomFeed,
  buildRssFeed,
  escapeXml,
  getFeedItems,
  type FeedItem,
} from "./feed";
import { SITE_URL } from "./site";

describe("getFeedItems", () => {
  it("includes every history chapter and every standalone page with a unique path", () => {
    const items = getFeedItems();
    const paths = items.map((i) => i.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const chapter of HISTORY_CHAPTERS) {
      expect(paths).toContain(`/history/${chapter.slug}/`);
    }
    for (const page of [
      "/culture/",
      "/take-action/",
      "/further-reading/",
      "/sources/",
      "/about/",
    ]) {
      expect(paths).toContain(page);
    }
  });

  it("takes each standalone page's title straight from NAV_ITEMS, not a separate copy", () => {
    const items = getFeedItems();
    for (const page of [
      "/culture/",
      "/take-action/",
      "/further-reading/",
      "/sources/",
      "/about/",
    ]) {
      const navItem = NAV_ITEMS.find((n) => n.href === page);
      const feedItem = items.find((i) => i.path === page);
      expect(feedItem?.title).toBe(navItem?.label);
    }
  });

  it("excludes /history/ and /search/, which aren't feed-able content pages", () => {
    const paths = getFeedItems().map((i) => i.path);
    expect(paths).not.toContain("/history/");
    expect(paths).not.toContain("/search/");
  });

  it("carries the verified date onto the current chapter's item and no others", () => {
    const items = getFeedItems();
    const current = items.find(
      (i) => i.path === "/history/gaza-and-the-present/",
    );
    expect(current?.date).toBeDefined();
    const others = items.filter(
      (i) => i.path !== "/history/gaza-and-the-present/",
    );
    expect(others.every((i) => i.date === undefined)).toBe(true);
  });
});

describe("escapeXml", () => {
  it("escapes all five XML special characters", () => {
    expect(escapeXml(`& < > " '`)).toBe("&amp; &lt; &gt; &quot; &apos;");
  });

  it("leaves ordinary text untouched", () => {
    expect(escapeXml("Gaza and the Present")).toBe("Gaza and the Present");
  });
});

const generatedAt = new Date("2026-09-10T12:00:00Z");

const items: FeedItem[] = [
  {
    title: "Partition and the Nakba",
    description: 'War & Peace -- "testing"',
    path: "/history/nakba/",
    date: "2026-09-08",
  },
  {
    title: "About Sumud",
    description: "No dated verification.",
    path: "/about/",
  },
];

describe("buildRssFeed", () => {
  const xml = buildRssFeed(items, generatedAt);

  it("starts with an XML declaration and has one item per feed entry", () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml.match(/<item>/g)).toHaveLength(2);
    expect(xml.match(/<\/item>/g)).toHaveLength(2);
  });

  it("escapes item titles and descriptions", () => {
    expect(xml).toContain("War &amp; Peace -- &quot;testing&quot;");
  });

  it("links each item to its full page URL", () => {
    expect(xml).toContain(`<link>${SITE_URL}/history/nakba/</link>`);
  });

  it("uses the item's verified date, and the generation time as a fallback", () => {
    expect(xml).toContain(new Date("2026-09-08T00:00:00Z").toUTCString());
    expect(xml).toContain(generatedAt.toUTCString());
  });

  it("declares itself as an RSS 2.0 channel with a self-referencing atom link", () => {
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain(`href="${SITE_URL}/rss.xml" rel="self"`);
  });
});

describe("buildAtomFeed", () => {
  const xml = buildAtomFeed(items, generatedAt);

  it("starts with an XML declaration and has one entry per feed item", () => {
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml.match(/<entry>/g)).toHaveLength(2);
    expect(xml.match(/<\/entry>/g)).toHaveLength(2);
  });

  it("escapes entry titles and descriptions", () => {
    expect(xml).toContain("War &amp; Peace -- &quot;testing&quot;");
  });

  it("uses the item's verified date, and the generation time as a fallback", () => {
    expect(xml).toContain(new Date("2026-09-08T00:00:00Z").toISOString());
    expect(xml).toContain(generatedAt.toISOString());
  });

  it("declares itself as an Atom feed with a self-referencing link", () => {
    expect(xml).toContain('xmlns="http://www.w3.org/2005/Atom"');
    expect(xml).toContain(`href="${SITE_URL}/atom.xml" rel="self"`);
  });
});
