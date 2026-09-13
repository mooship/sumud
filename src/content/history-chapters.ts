export interface HistoryChapterTranslation {
  period: string;
  title: string;
  summary: string;
}

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
  /**
  Arabic translation of `period`/`title`/`summary`, used on the `/ar/` route tree.
  */
  ar: HistoryChapterTranslation;
}

export const HISTORY_CHAPTERS: HistoryChapter[] = [
  {
    slug: "ottoman-palestine",
    period: "Until 1917",
    title: "Ottoman Palestine",
    summary:
      "For four centuries Palestine was a province of the Ottoman Empire: a mixed, mostly agrarian society of Muslims, Christians and a small Jewish minority, bound together by land, trade and faith.",
    ar: {
      period: "حتى عام 1917",
      title: "فلسطين العثمانية",
      summary:
        "لأربعة قرون كانت فلسطين ولاية تابعة للدولة العثمانية: مجتمعًا مختلطًا وزراعيًا في الغالب من المسلمين والمسيحيين وأقلية يهودية صغيرة، جمعتهم الأرض والتجارة والإيمان.",
    },
  },
  {
    slug: "british-mandate",
    period: "1917 – 1947",
    title: "The British Mandate",
    summary:
      "Britain took Palestine from the Ottomans and, through the Balfour Declaration, promised a 'national home for the Jewish people' in a land it did not own. Three decades of immigration, land sales and revolt followed.",
    ar: {
      period: "1917 – 1947",
      title: "الانتداب البريطاني",
      summary:
        "انتزعت بريطانيا فلسطين من العثمانيين، ووعدت من خلال وعد بلفور بـ«وطن قومي للشعب اليهودي» في أرض لم تكن تملكها. تلت ذلك ثلاثة عقود من الهجرة وبيع الأراضي والثورات.",
    },
  },
  {
    slug: "nakba",
    period: "1947 – 1949",
    title: "Partition and the Nakba",
    summary:
      "The UN voted to partition Palestine. War followed. More than 700,000 Palestinians were driven from or fled their homes, and some 500 villages were destroyed. Palestinians call it the Nakba -- the catastrophe.",
    ar: {
      period: "1947 – 1949",
      title: "التقسيم والنكبة",
      summary:
        "صوّتت الأمم المتحدة على تقسيم فلسطين. تلت ذلك الحرب. طُرد أكثر من 700,000 فلسطيني من ديارهم أو فرّوا منها، ودُمّر نحو 500 قرية. يسمّي الفلسطينيون ذلك النكبة.",
    },
  },
  {
    slug: "occupation-and-exile",
    period: "1949 – 1967",
    title: "Exile and Military Rule",
    summary:
      "Palestinian refugees built new lives in camps across the region. Those who stayed inside the new state of Israel lived for nearly two decades under military rule. In 1964 the PLO was founded.",
    ar: {
      period: "1949 – 1967",
      title: "المنفى والحكم العسكري",
      summary:
        "بنى اللاجئون الفلسطينيون حياة جديدة في مخيمات عبر المنطقة. أما من بقوا داخل دولة إسرائيل الجديدة فعاشوا قرابة عقدين تحت الحكم العسكري. وفي عام 1964 تأسست منظمة التحرير الفلسطينية.",
    },
  },
  {
    slug: "occupation-and-settlement",
    period: "1967 – 1993",
    title: "Occupation and the Intifada",
    summary:
      "The Six-Day War put the West Bank, Gaza and East Jerusalem under Israeli military occupation. Settlement building began almost immediately. In 1987 a mass uprising, the First Intifada, broke out.",
    ar: {
      period: "1967 – 1993",
      title: "الاحتلال والانتفاضة",
      summary:
        "وضعت حرب الأيام الستة الضفة الغربية وغزة والقدس الشرقية تحت الاحتلال العسكري الإسرائيلي. وبدأ بناء المستوطنات على الفور تقريبًا. وفي عام 1987 اندلعت انتفاضة شعبية واسعة، الانتفاضة الأولى.",
    },
  },
  {
    slug: "oslo-to-blockade",
    period: "1993 – 2007",
    title: "Oslo, and its Unravelling",
    summary:
      "The Oslo Accords promised a path to statehood but delivered fragmented self-rule under continued occupation. A second, bloodier intifada followed, then Israel's withdrawal from Gaza -- and, within two years, a blockade.",
    ar: {
      period: "1993 – 2007",
      title: "أوسلو وانهياره",
      summary:
        "وعدت اتفاقيات أوسلو بمسار نحو إقامة الدولة، لكنها لم تُفضِ إلا إلى حكم ذاتي مجزأ تحت احتلال مستمر. تلتها انتفاضة ثانية أكثر دموية، ثم انسحاب إسرائيل من غزة، وخلال عامين فُرض عليها الحصار.",
    },
  },
  {
    slug: "gaza-and-the-present",
    period: "2007 – present",
    title: "Siege, War and the Present",
    summary:
      "Gaza has lived under blockade for close to two decades and endured repeated wars. Since October 2023 it has faced the most destructive of them. This chapter carries the story to today.",
    current: true,
    verified: "2026-09-12",
    ar: {
      period: "2007 – حتى الآن",
      title: "الحصار والحرب والحاضر",
      summary:
        "عاشت غزة تحت الحصار لما يقارب عقدين من الزمن، وعانت من حروب متكررة. ومنذ أكتوبر 2023 تواجه أكثرها دمارًا. يحمل هذا الفصل القصة حتى اليوم.",
    },
  },
];
