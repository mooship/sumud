export interface HistoryChapter {
  slug: string;
  period: string;
  title: string;
  summary: string;
  /**
   * Marks the one chapter that carries the story to today (still unfolding,
   * not yet closed).
   */
  current?: boolean;
  /**
   * ISO date (YYYY-MM-DD) this chapter's facts and figures were last checked
   * against its sources. Only meaningful for {@link current} chapters --
   * settled historical chapters don't need a freshness marker.
   */
  verified?: string;
}

export const HISTORY_CHAPTERS: HistoryChapter[] = [
  {
    slug: "ottoman-palestine",
    period: "Until 1917",
    title: "Ottoman Palestine",
    summary:
      "For four centuries Palestine was a province of the Ottoman Empire: a mixed, mostly agrarian society of Muslims, Christians and a small Jewish minority, bound together by land, trade and faith.",
  },
  {
    slug: "british-mandate",
    period: "1917 – 1947",
    title: "The British Mandate",
    summary:
      "Britain took Palestine from the Ottomans and, through the Balfour Declaration, promised a 'national home for the Jewish people' in a land it did not own. Three decades of immigration, land sales and revolt followed.",
  },
  {
    slug: "nakba",
    period: "1947 – 1949",
    title: "Partition and the Nakba",
    summary:
      "The UN voted to partition Palestine. War followed. More than 700,000 Palestinians were driven from or fled their homes, and some 500 villages were destroyed. Palestinians call it the Nakba -- the catastrophe.",
  },
  {
    slug: "occupation-and-exile",
    period: "1949 – 1967",
    title: "Exile and Military Rule",
    summary:
      "Palestinian refugees built new lives in camps across the region. Those who stayed inside the new state of Israel lived for nearly two decades under military rule. In 1964 the PLO was founded.",
  },
  {
    slug: "occupation-and-settlement",
    period: "1967 – 1993",
    title: "Occupation and the Intifada",
    summary:
      "The Six-Day War put the West Bank, Gaza and East Jerusalem under Israeli military occupation. Settlement building began almost immediately. In 1987 a mass uprising, the First Intifada, broke out.",
  },
  {
    slug: "oslo-to-blockade",
    period: "1993 – 2007",
    title: "Oslo, and its Unravelling",
    summary:
      "The Oslo Accords promised a path to statehood but delivered fragmented self-rule under continued occupation. A second, bloodier intifada followed, then Israel's withdrawal from Gaza -- and, within two years, a blockade.",
  },
  {
    slug: "gaza-and-the-present",
    period: "2007 – present",
    title: "Siege, War and the Present",
    summary:
      "Gaza has lived under blockade for close to two decades and endured repeated wars. Since October 2023 it has faced the most destructive of them. This chapter carries the story to today.",
    current: true,
    verified: "2026-09-10",
  },
];
