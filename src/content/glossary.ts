export interface GlossaryTermTranslation {
  term: string;
  definition: string;
}

export interface GlossaryTerm {
  /**
  Stable slug used to deep-link a specific term, e.g. "/glossary/#nakba".
  */
  id: string;
  term: string;
  /**
  Arabic script for the term, where the term itself is a transliterated Arabic word.
  */
  arabic?: string;
  definition: string;
  /**
  Arabic translation of `term`/`definition`, used on the `/ar/` route tree.
  */
  ar: GlossaryTermTranslation;
}

export interface GlossaryCategoryTranslation {
  title: string;
  intro: string;
}

export interface GlossaryCategory {
  title: string;
  intro: string;
  terms: GlossaryTerm[];
  /**
  Arabic translation of `title`/`intro`, used on the `/ar/` route tree.
  */
  ar: GlossaryCategoryTranslation;
}

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  {
    title: "Core terms",
    intro:
      "Words that recur across this site's history chapters, usually left untranslated because no single English word carries the same weight.",
    ar: {
      title: "مصطلحات أساسية",
      intro:
        "مفردات تتكرر عبر فصول تاريخ هذا الموقع، وتُترك عادة دون ترجمة لأن لا كلمة إنجليزية واحدة تحمل الثقل نفسه.",
    },
    terms: [
      {
        id: "sumud",
        term: "Sumud",
        arabic: "صمود",
        definition:
          "Steadfastness: the decision to stay on the land, in the village or the camp, rather than leave, and to keep living and rebuilding in the face of occupation, dispossession or exile. See the Culture & Sumud page for the idea in full.",
        ar: {
          term: "صمود",
          definition:
            "الصمود: قرار البقاء في الأرض، في القرية أو المخيم، بدلًا من الرحيل، ومواصلة الحياة وإعادة البناء في مواجهة الاحتلال أو التهجير أو المنفى. انظر صفحة الثقافة والصمود لمزيد من التفصيل.",
        },
      },
      {
        id: "nakba",
        term: "Nakba",
        arabic: "النكبة",
        definition:
          "'The catastrophe': the displacement of more than 700,000 Palestinians and destruction of some 500 villages during the 1947-49 war, marking the founding of the state of Israel and the start of the Palestinian refugee experience.",
        ar: {
          term: "النكبة",
          definition:
            "«الكارثة»: تهجير أكثر من 700,000 فلسطيني وتدمير نحو 500 قرية خلال حرب 1947-1949، وهي الأحداث التي رافقت تأسيس دولة إسرائيل وبداية تجربة اللجوء الفلسطيني.",
        },
      },
      {
        id: "intifada",
        term: "Intifada",
        arabic: "انتفاضة",
        definition:
          "Literally 'shaking off'. Used for two mass Palestinian uprisings against the occupation: the First Intifada (1987-93), largely civil disobedience and strikes, and the more violent Second Intifada (2000-05).",
        ar: {
          term: "انتفاضة",
          definition:
            "تعني حرفيًا «النفض». تُستخدم للإشارة إلى انتفاضتين فلسطينيتين جماهيريتين ضد الاحتلال: الانتفاضة الأولى (1987-1993)، التي غلب عليها العصيان المدني والإضرابات، والانتفاضة الثانية (2000-2005) الأكثر عنفًا.",
        },
      },
      {
        id: "al-awda",
        term: "Al-awda",
        arabic: "العودة",
        definition:
          "'The return': the right of Palestinian refugees and their descendants to return to the homes and land they were displaced from in 1948, affirmed by UN General Assembly Resolution 194 but never implemented.",
        ar: {
          term: "العودة",
          definition:
            "«العودة»: حق اللاجئين الفلسطينيين وذريتهم في العودة إلى ديارهم وأراضيهم التي هُجّروا منها عام 1948، وهو حق أكده قرار الجمعية العامة للأمم المتحدة رقم 194 لكنه لم يُنفَّذ قط.",
        },
      },
      {
        id: "al-shatat",
        term: "Al-shatat",
        arabic: "الشتات",
        definition:
          "'The diaspora': Palestinians and their descendants living outside historic Palestine, above all in refugee communities across Jordan, Lebanon and Syria but also scattered across every continent.",
        ar: {
          term: "الشتات",
          definition:
            "«الشتات»: الفلسطينيون وذريتهم الذين يعيشون خارج فلسطين التاريخية، وفي مقدمتهم مجتمعات اللاجئين في الأردن ولبنان وسوريا، إضافة إلى المنتشرين في كل قارة.",
        },
      },
    ],
  },
  {
    title: "Legal and geographic terms",
    intro:
      "Terms that describe status, territory or borders, some of which are themselves disputed.",
    ar: {
      title: "مصطلحات قانونية وجغرافية",
      intro:
        "مصطلحات تصف وضعًا قانونيًا أو أرضًا أو حدودًا، وبعضها متنازع عليه في حد ذاته.",
    },
    terms: [
      {
        id: "opt",
        term: "Occupied Palestinian Territories (oPt)",
        definition:
          "The West Bank, including East Jerusalem, and the Gaza Strip: the territory Israel has held under military occupation since the 1967 Six-Day War, as distinct from Israel within its pre-1967 borders.",
        ar: {
          term: "الأراضي الفلسطينية المحتلة",
          definition:
            "الضفة الغربية، بما فيها القدس الشرقية، وقطاع غزة: الأراضي التي تحتفظ بها إسرائيل تحت الاحتلال العسكري منذ حرب الأيام الستة عام 1967، تمييزًا لها عن إسرائيل ضمن حدودها قبل عام 1967.",
        },
      },
      {
        id: "green-line",
        term: "Green Line",
        definition:
          "The armistice line agreed in 1949 after the first Arab-Israeli war, separating Israel from the West Bank and Gaza. It has no formal legal status today but is still used as the reference line for describing settlement expansion beyond it.",
        ar: {
          term: "الخط الأخضر",
          definition:
            "خط الهدنة الذي اتُّفق عليه عام 1949 بعد الحرب العربية الإسرائيلية الأولى، ويفصل إسرائيل عن الضفة الغربية وغزة. ليس له اليوم أي وضع قانوني رسمي، لكنه لا يزال يُستخدم كخط مرجعي لوصف التوسع الاستيطاني خارج حدوده.",
        },
      },
      {
        id: "settlement",
        term: "Settlement",
        definition:
          "A community of Israeli civilians built on land occupied since 1967, populated and governed under Israeli civil law even though the land itself remains, for its Palestinian residents, under military law. Considered illegal under international law by the UN and most states; Israel disputes this for parts of the West Bank.",
        ar: {
          term: "المستوطنة",
          definition:
            "تجمع سكاني من المدنيين الإسرائيليين يُبنى على أرض محتلة منذ عام 1967، ويخضع سكانه للقانون المدني الإسرائيلي رغم أن الأرض نفسها تبقى، بالنسبة لسكانها الفلسطينيين، خاضعة للقانون العسكري. تعتبرها الأمم المتحدة ومعظم الدول غير قانونية بموجب القانون الدولي، وتنازع إسرائيل في ذلك فيما يخص أجزاء من الضفة الغربية.",
        },
      },
      {
        id: "blockade",
        term: "Blockade",
        definition:
          "The land, sea and air restrictions Israel and Egypt have imposed on the Gaza Strip since 2007, controlling the movement of people and the import of goods, including materials needed for reconstruction after each war.",
        ar: {
          term: "الحصار",
          definition:
            "القيود البرية والبحرية والجوية التي تفرضها إسرائيل ومصر على قطاع غزة منذ عام 2007، وتتحكم بحركة الأفراد واستيراد البضائع، بما في ذلك المواد اللازمة لإعادة الإعمار بعد كل حرب.",
        },
      },
      {
        id: "yellow-line",
        term: 'The "yellow line"',
        definition:
          "The line dividing Israeli- and Palestinian-held areas of Gaza under the October 2025 ceasefire agreement, referenced repeatedly in reporting on incidents since the truce began.",
        ar: {
          term: "«الخط الأصفر»",
          definition:
            "الخط الذي يفصل بين المناطق التي تسيطر عليها إسرائيل وتلك الخاضعة للفلسطينيين في غزة بموجب اتفاق وقف إطلاق النار في أكتوبر 2025، ويتكرر ذكره في التقارير عن الحوادث منذ بدء الهدنة.",
        },
      },
    ],
  },
  {
    title: "Institutions and bodies",
    intro:
      "Organisations and courts named throughout the history chapters. See the Sources page for what each one is cited for.",
    ar: {
      title: "مؤسسات وهيئات",
      intro:
        "منظمات ومحاكم يرد ذكرها عبر فصول التاريخ. انظر صفحة المصادر لمعرفة الغرض من الاستشهاد بكل منها.",
    },
    terms: [
      {
        id: "unrwa",
        term: "UNRWA",
        definition:
          "The UN Relief and Works Agency for Palestine Refugees, established in 1949 to support Palestinians displaced by the Nakba, and still the main provider of education, healthcare and relief to registered Palestine refugees today.",
        ar: {
          term: "الأونروا",
          definition:
            "وكالة الأمم المتحدة لإغاثة وتشغيل اللاجئين الفلسطينيين، تأسست عام 1949 لدعم الفلسطينيين الذين هُجّروا في النكبة، ولا تزال حتى اليوم المزود الرئيسي للتعليم والرعاية الصحية والإغاثة للاجئين الفلسطينيين المسجلين.",
        },
      },
      {
        id: "plo",
        term: "PLO",
        definition:
          "The Palestine Liberation Organization, founded in 1964 as an umbrella political and, at times, military body representing the Palestinian national movement. Distinct from Hamas, which was founded later, in 1987, and has never joined the PLO.",
        ar: {
          term: "منظمة التحرير الفلسطينية",
          definition:
            "منظمة التحرير الفلسطينية، تأسست عام 1964 كهيئة جامعة سياسية، وعسكرية في بعض الأحيان، تمثل الحركة الوطنية الفلسطينية. وهي منظمة مختلفة عن حماس التي تأسست لاحقًا عام 1987 ولم تنضم قط إلى منظمة التحرير.",
        },
      },
      {
        id: "icj",
        term: "International Court of Justice (ICJ)",
        definition:
          "The UN's principal judicial body, based in The Hague, which rules on disputes between states and issues advisory opinions, including on the legality of the separation barrier (2004) and the occupation itself (2024). Not to be confused with the International Criminal Court.",
        ar: {
          term: "محكمة العدل الدولية",
          definition:
            "الهيئة القضائية الرئيسية للأمم المتحدة، ومقرها لاهاي، وتفصل في النزاعات بين الدول وتصدر آراءً استشارية، من بينها آراء حول مشروعية جدار الفصل (2004) والاحتلال نفسه (2024). لا ينبغي الخلط بينها وبين المحكمة الجنائية الدولية.",
        },
      },
      {
        id: "icc",
        term: "International Criminal Court (ICC)",
        definition:
          "A separate court, also in The Hague, that prosecutes individuals for war crimes, crimes against humanity and genocide. Issued arrest warrants over the Gaza war in November 2024. Not to be confused with the International Court of Justice.",
        ar: {
          term: "المحكمة الجنائية الدولية",
          definition:
            "محكمة منفصلة، تقع أيضًا في لاهاي، تلاحق قضائيًا الأفراد المتهمين بجرائم حرب وجرائم ضد الإنسانية وإبادة جماعية. أصدرت مذكرات توقيف بشأن حرب غزة في نوفمبر 2024. لا ينبغي الخلط بينها وبين محكمة العدل الدولية.",
        },
      },
    ],
  },
];
