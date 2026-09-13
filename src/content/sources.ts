export interface SourceEntryTranslation {
  meta: string;
}

export interface SourceEntry {
  /**
  Stable slug used to deep-link a specific citation to this entry, e.g. "/sources/#unrwa".
  */
  id: string;
  name: string;
  meta: string;
  /** Arabic translation of `meta`, used on the `/ar/` route tree. Source and author names are
   *  kept as-is in both locales -- they're proper nouns and document titles, not prose. */
  ar: SourceEntryTranslation;
}

export interface SourceSectionTranslation {
  title: string;
}

export interface SourceSection {
  title: string;
  entries: SourceEntry[];
  /**
  Arabic translation of `title`, used on the `/ar/` route tree.
  */
  ar: SourceSectionTranslation;
}

export const SOURCE_SECTIONS: SourceSection[] = [
  {
    title: "Institutional and archival records",
    ar: { title: "السجلات المؤسسية والأرشيفية" },
    entries: [
      {
        id: "unrwa",
        name: "UN Relief and Works Agency for Palestine Refugees (UNRWA)",
        meta: "Situation reports and registration data on Palestine refugees since 1949.",
        ar: {
          meta: "تقارير ميدانية وبيانات تسجيل حول اللاجئين الفلسطينيين منذ عام 1949.",
        },
      },
      {
        id: "ocha",
        name: "UN Office for the Coordination of Humanitarian Affairs -- oPt (OCHA)",
        meta: "Humanitarian situation updates for the West Bank and Gaza Strip.",
        ar: {
          meta: "تحديثات حول الوضع الإنساني في الضفة الغربية وقطاع غزة.",
        },
      },
      {
        id: "un-resolutions-181-194",
        name: "UN General Assembly Resolution 181 (1947) and Resolution 194 (1948)",
        meta: "The partition plan, and the refugee right of return.",
        ar: {
          meta: "خطة التقسيم، وحق اللاجئين في العودة.",
        },
      },
      {
        id: "icj",
        name: "International Court of Justice, advisory opinions on the separation barrier (2004) and the occupation (2024)",
        meta: "The Court's assessments of the legality of specific Israeli policies under international law.",
        ar: {
          meta: "تقييمات المحكمة لمشروعية سياسات إسرائيلية محددة بموجب القانون الدولي.",
        },
      },
    ],
  },
  {
    title: "Historical scholarship",
    ar: { title: "الدراسات التاريخية" },
    entries: [
      {
        id: "khalidi-hundred-years-war",
        name: "Rashid Khalidi, The Hundred Years' War on Palestine (2020)",
        meta: "A history of the conflict told through six defining episodes, by a Palestinian-American historian.",
        ar: {
          meta: "تاريخ للصراع يُروى عبر ست محطات فاصلة، بقلم مؤرخ فلسطيني أمريكي.",
        },
      },
      {
        id: "morris-refugee-problem-revisited",
        name: "Benny Morris, The Birth of the Palestinian Refugee Problem Revisited (2004)",
        meta: "An Israeli historian's archival account of the 1948 exodus, drawing on newly declassified Israeli military records.",
        ar: {
          meta: "سرد أرشيفي لمؤرخ إسرائيلي عن نزوح عام 1948، معتمدًا على وثائق عسكرية إسرائيلية أُفرج عنها حديثًا.",
        },
      },
      {
        id: "pappe-ethnic-cleansing",
        name: "Ilan Pappe, The Ethnic Cleansing of Palestine (2006)",
        meta: "A more contested, critical account of 1948 by an Israeli historian associated with Israel's 'New Historians'.",
        ar: {
          meta: "سرد نقدي أكثر إثارة للجدل حول أحداث 1948، بقلم مؤرخ إسرائيلي ينتمي إلى ما يُعرف بـ«المؤرخين الجدد» في إسرائيل.",
        },
      },
      {
        id: "said-question-of-palestine",
        name: "Edward Said, The Question of Palestine (1979)",
        meta: "An early, influential articulation of the Palestinian national narrative for an English-language audience.",
        ar: {
          meta: "من أوائل الصياغات المؤثرة للسردية الوطنية الفلسطينية الموجهة لجمهور ناطق بالإنجليزية.",
        },
      },
      {
        id: "britannica",
        name: "Encyclopaedia Britannica, 'Palestine' and 'Israel'",
        meta: "General reference entries used to check dates, figures and place names.",
        ar: {
          meta: "مداخل مرجعية عامة استُخدمت للتحقق من التواريخ والأرقام وأسماء الأماكن.",
        },
      },
    ],
  },
  {
    title: "Human rights reporting",
    ar: { title: "تقارير حقوق الإنسان" },
    entries: [
      {
        id: "btselem",
        name: "B'Tselem",
        meta: "Israeli human rights organisation documenting the occupation from within Israel.",
        ar: {
          meta: "منظمة حقوق إنسان إسرائيلية توثق الاحتلال من داخل إسرائيل.",
        },
      },
      {
        id: "al-haq",
        name: "Al-Haq",
        meta: "Palestinian human rights organisation based in Ramallah, documenting violations in the oPt since 1979.",
        ar: {
          meta: "منظمة حقوق إنسان فلسطينية مقرها رام الله، توثق الانتهاكات في الأراضي الفلسطينية المحتلة منذ عام 1979.",
        },
      },
      {
        id: "hrw-amnesty",
        name: "Human Rights Watch and Amnesty International",
        meta: "International organisations' country reporting on Israel and the Occupied Palestinian Territories.",
        ar: {
          meta: "تقارير قطرية لمنظمات دولية حول إسرائيل والأراضي الفلسطينية المحتلة.",
        },
      },
      {
        id: "icrc",
        name: "International Committee of the Red Cross (ICRC)",
        meta: "Reporting on international humanitarian law as it applies to the occupation and to conduct in Gaza.",
        ar: {
          meta: "تقارير حول تطبيق القانون الدولي الإنساني على الاحتلال وعلى سير الأحداث في غزة.",
        },
      },
    ],
  },
  {
    title: "Gaza war reporting, 2023 to present",
    ar: { title: "تغطية حرب غزة، من 2023 حتى الآن" },
    entries: [
      {
        id: "gaza-health-ministry",
        name: "Gaza's Ministry of Health",
        meta: "The Gaza health authorities' running casualty count for the war, run under Hamas but assessed by the UN in this and prior conflicts as broadly reliable.",
        ar: {
          meta: "إحصاء متواصل لضحايا الحرب تصدره السلطات الصحية في غزة الخاضعة لحماس، لكن الأمم المتحدة اعتبرته في هذا النزاع والنزاعات السابقة موثوقًا إلى حد كبير.",
        },
      },
      {
        id: "world-bank",
        name: "World Bank Group, joint damage and needs assessments",
        meta: "Assessments produced with the UN and European Union of destroyed housing, hospitals and infrastructure across Gaza.",
        ar: {
          meta: "تقييمات أُعدت بالتعاون مع الأمم المتحدة والاتحاد الأوروبي للمساكن والمستشفيات والبنية التحتية المدمرة في أنحاء غزة.",
        },
      },
      {
        id: "ohchr",
        name: "UN Office of the High Commissioner for Human Rights (OHCHR)",
        meta: "The UN's human rights office, led since 2022 by Volker Türk, monitoring conduct in Gaza and the West Bank.",
        ar: {
          meta: "مكتب حقوق الإنسان التابع للأمم المتحدة، برئاسة فولكر تورك منذ عام 2022، ويرصد سير الأحداث في غزة والضفة الغربية.",
        },
      },
      {
        id: "ipc-famine-classification",
        name: "Integrated Food Security Phase Classification (IPC)",
        meta: "The UN-backed international system for classifying food insecurity and famine, which found famine conditions in parts of Gaza in 2025.",
        ar: {
          meta: "النظام الدولي المدعوم من الأمم المتحدة لتصنيف انعدام الأمن الغذائي والمجاعة، والذي رصد ظروف مجاعة في أجزاء من غزة عام 2025.",
        },
      },
      {
        id: "icc",
        name: "International Criminal Court (ICC)",
        meta: "The Hague-based court that issued arrest warrants over the war in November 2024.",
        ar: {
          meta: "المحكمة التي تتخذ من لاهاي مقرًا، وأصدرت مذكرات توقيف بشأن الحرب في نوفمبر 2024.",
        },
      },
    ],
  },
];
