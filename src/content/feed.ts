import { HISTORY_CHAPTERS } from "./history-chapters";

export const SITE_NAME = "Sumud";
export const SITE_URL = "https://sumud.timothybrits.co.za";
export const SITE_DESCRIPTION =
  "Sumud tells the story of Palestine and its people, before 1947 and after: history, culture, and steadfastness.";

export interface FeedItem {
  title: string;
  description: string;
  path: string;
  /**
   * ISO date (YYYY-MM-DD) the content was last verified against sources,
   * when known.
   */
  date?: string;
}

const STANDALONE_PAGES: FeedItem[] = [
  {
    title: "Culture & Sumud",
    description:
      "The idea of sumud, and the land, food, craft, language and literature through which Palestinians have kept a national identity alive.",
    path: "/culture/",
  },
  {
    title: "Take Action",
    description:
      "Reputable humanitarian and human rights organisations working in Gaza, the West Bank and with Palestinian refugees.",
    path: "/take-action/",
  },
  {
    title: "Further Reading",
    description:
      "Recommended history, memoir, fiction and poetry about Palestine, from Palestinian, Israeli and other writers.",
    path: "/further-reading/",
  },
  {
    title: "Sources",
    description: "The kinds of sources this project draws on, and why.",
    path: "/sources/",
  },
  {
    title: "About Sumud",
    description:
      "What this project is, why it exists, how it was researched, and how to flag a correction.",
    path: "/about/",
  },
];

/**
 * Every history chapter plus the standalone content pages, in the same order
 * the site itself presents them. Chapters carrying a real `verified` date
 * (currently just the still-unfolding present-day chapter) surface it as the
 * feed item's date; everything else falls back to the feed's generation time
 * in {@link buildRssFeed}/{@link buildAtomFeed}, since this site has no
 * per-page edit history to draw a more precise date from.
 */
export function getFeedItems(): FeedItem[] {
  const chapters: FeedItem[] = HISTORY_CHAPTERS.map((chapter) => ({
    title: chapter.title,
    description: chapter.summary,
    path: `/history/${chapter.slug}/`,
    date: chapter.verified,
  }));
  return [...chapters, ...STANDALONE_PAGES];
}

export function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function itemDate(item: FeedItem, generatedAt: Date): Date {
  return item.date ? new Date(`${item.date}T00:00:00Z`) : generatedAt;
}

export function buildRssFeed(items: FeedItem[], generatedAt: Date): string {
  const channelItems = items
    .map((item) => {
      const url = `${SITE_URL}${item.path}`;
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${itemDate(item, generatedAt).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2000/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-gb</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${generatedAt.toUTCString()}</lastBuildDate>
${channelItems}
  </channel>
</rss>
`;
}

export function buildAtomFeed(items: FeedItem[], generatedAt: Date): string {
  const entries = items
    .map((item) => {
      const url = `${SITE_URL}${item.path}`;
      return `  <entry>
    <title>${escapeXml(item.title)}</title>
    <link href="${url}" />
    <id>${url}</id>
    <updated>${itemDate(item, generatedAt).toISOString()}</updated>
    <summary>${escapeXml(item.description)}</summary>
  </entry>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE_NAME)}</title>
  <subtitle>${escapeXml(SITE_DESCRIPTION)}</subtitle>
  <link href="${SITE_URL}/atom.xml" rel="self" />
  <link href="${SITE_URL}/" />
  <id>${SITE_URL}/</id>
  <updated>${generatedAt.toISOString()}</updated>
${entries}
</feed>
`;
}
