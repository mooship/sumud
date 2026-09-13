export interface BookTranslation {
  description: string;
}

export interface Book {
  title: string;
  author: string;
  year: number;
  description: string;
  /** Arabic translation of `description`, used on the `/ar/` route tree. Title and author are
   *  kept as-is in both locales -- these are English-language editions being recommended by
   *  name, not prose to translate. */
  ar: BookTranslation;
}

export interface BookCategoryTranslation {
  title: string;
  intro: string;
}

export interface BookCategory {
  title: string;
  intro: string;
  books: Book[];
  /**
  Arabic translation of `title`/`intro`, used on the `/ar/` route tree.
  */
  ar: BookCategoryTranslation;
}

export const BOOK_CATEGORIES: BookCategory[] = [
  {
    title: "History & politics",
    intro:
      "Accounts of how Palestine got to where it is, from historians and political writers across the spectrum of opinion.",
    ar: {
      title: "التاريخ والسياسة",
      intro:
        "روايات لكيفية وصول فلسطين إلى واقعها الراهن، بأقلام مؤرخين وكتّاب سياسيين من مختلف الاتجاهات الفكرية.",
    },
    books: [
      {
        title: "The Hundred Years' War on Palestine",
        author: "Rashid Khalidi",
        year: 2020,
        description:
          "A history of the conflict told through six defining episodes and three generations of one Palestinian family, drawing on the author's own family archive.",
        ar: {
          description:
            "تاريخ للصراع يُروى عبر ست محطات فاصلة وثلاثة أجيال من عائلة فلسطينية واحدة، بالاعتماد على أرشيف عائلة المؤلف نفسه.",
        },
      },
      {
        title: "The Ethnic Cleansing of Palestine",
        author: "Ilan Pappe",
        year: 2006,
        description:
          "An Israeli historian's account of the 1948 expulsions, drawing on newly opened Israeli military archives. Contested: other historians who have read the same archives describe the same events in less deliberate terms.",
        ar: {
          description:
            "رواية مؤرخ إسرائيلي لأحداث تهجير عام 1948، بالاعتماد على أرشيفات عسكرية إسرائيلية أُتيحت حديثًا. رواية مثيرة للجدل: مؤرخون آخرون اطلعوا على الأرشيفات ذاتها ويصفون الأحداث نفسها بعبارات أقل قصدية.",
        },
      },
      {
        title: "The Question of Palestine",
        author: "Edward Said",
        year: 1979,
        description:
          "An early, influential articulation of the Palestinian case for an English-language audience, from the literary critic and public intellectual.",
        ar: {
          description:
            "من أوائل الصياغات المؤثرة للقضية الفلسطينية الموجهة لجمهور ناطق بالإنجليزية، بقلم الناقد الأدبي والمفكر العام.",
        },
      },
      {
        title: "A Day in the Life of Abed Salama",
        author: "Nathan Thrall",
        year: 2023,
        description:
          "A single 2012 bus crash near Jerusalem, and the maze of permits, checkpoints and jurisdictions a Palestinian father has to navigate to reach his injured son. Winner of the Pulitzer Prize for General Nonfiction.",
        ar: {
          description:
            "حادث تصادم حافلة واحد وقع عام 2012 قرب القدس، ومتاهة التصاريح ونقاط التفتيش والولايات القضائية التي يضطر أب فلسطيني لعبورها للوصول إلى ابنه المصاب. حازت على جائزة بوليتزر لأفضل كتاب غير روائي عام.",
        },
      },
    ],
  },
  {
    title: "Memoir & testimony",
    intro: "First-person accounts of life under occupation, exile and war.",
    ar: {
      title: "المذكرات والشهادات",
      intro: "شهادات بضمير المتكلم عن الحياة تحت الاحتلال والمنفى والحرب.",
    },
    books: [
      {
        title: "Palestinian Walks: Notes on a Vanishing Landscape",
        author: "Raja Shehadeh",
        year: 2007,
        description:
          "Six walks through the hills around Ramallah over 26 years, watching the landscape close under settlement and checkpoint. Winner of the Orwell Prize.",
        ar: {
          description:
            "ست جولات سيرًا على الأقدام في تلال رام الله على مدى 26 عامًا، يرصد فيها الكاتب انغلاق المشهد الطبيعي تحت وطأة الاستيطان ونقاط التفتيش. حازت على جائزة أورويل.",
        },
      },
      {
        title: "In Search of Fatima: A Palestinian Story",
        author: "Ghada Karmi",
        year: 2002,
        description:
          "A memoir of childhood in Jerusalem before 1948, exile in London, and a fraught return decades later.",
        ar: {
          description:
            "مذكرات عن طفولة في القدس قبل عام 1948، ومنفى في لندن، وعودة مضطربة بعد عقود.",
        },
      },
      {
        title: "Don't Look Left: A Diary of Genocide",
        author: "Atef Abu Saif",
        year: 2024,
        description:
          "A Gaza-based writer's diary of the war's first months, written from inside it while displaced with his family.",
        ar: {
          description:
            "يوميات كاتب مقيم في غزة عن الأشهر الأولى من الحرب، كتبها من داخلها وهو نازح مع عائلته.",
        },
      },
    ],
  },
  {
    title: "Fiction",
    intro:
      "Novels and short fiction, some of it foundational to Palestinian literature and some of it very recent.",
    ar: {
      title: "الأدب الروائي",
      intro:
        "روايات وقصص قصيرة، بعضها تأسيسي في الأدب الفلسطيني وبعضها حديث جدًا.",
    },
    books: [
      {
        title: "Men in the Sun",
        author: "Ghassan Kanafani",
        year: 1963,
        description:
          "A short novel about three refugees smuggled across the desert to Kuwait in an empty water tanker, foundational to modern Palestinian literature.",
        ar: {
          description:
            "رواية قصيرة عن ثلاثة لاجئين يُهرَّبون عبر الصحراء إلى الكويت داخل خزان مياه فارغ، وهي عمل تأسيسي في الأدب الفلسطيني الحديث.",
        },
      },
      {
        title: "Mornings in Jenin",
        author: "Susan Abulhawa",
        year: 2010,
        description:
          "A multigenerational family saga spanning 1948 to the second intifada, following one family displaced from their village near Haifa.",
        ar: {
          description:
            "ملحمة عائلية متعددة الأجيال تمتد من عام 1948 إلى الانتفاضة الثانية، تتبع عائلة واحدة هُجّرت من قريتها قرب حيفا.",
        },
      },
      {
        title: "Minor Detail",
        author: "Adania Shibli",
        year: 2020,
        description:
          "A taut, formally daring novel linking a 1949 atrocity to a present-day search for the truth about it. Shortlisted for the International Booker Prize.",
        ar: {
          description:
            "رواية مشدودة وجريئة الشكل تربط بين جريمة وقعت عام 1949 وبحث معاصر عن حقيقتها. وصلت إلى القائمة القصيرة لجائزة البوكر الدولية.",
        },
      },
      {
        title: "Enter Ghost",
        author: "Isabella Hammad",
        year: 2023,
        description:
          "A London-based actress returns to Haifa and joins a West Bank production of Hamlet, staged across the fault lines of occupation.",
        ar: {
          description:
            "ممثلة مقيمة في لندن تعود إلى حيفا وتنضم إلى إنتاج مسرحي لهاملت في الضفة الغربية، يُعرض عبر خطوط الصدع التي يرسمها الاحتلال.",
        },
      },
    ],
  },
  {
    title: "Poetry",
    intro: "Palestinian poets, in translation and in English.",
    ar: {
      title: "الشعر",
      intro: "شعراء فلسطينيون، في الترجمة وبالإنجليزية.",
    },
    books: [
      {
        title: "Unfortunately, It Was Paradise: Selected Poems",
        author: "Mahmoud Darwish",
        year: 2003,
        description:
          "A representative selection from Palestine's national poet, translated by Munir Akash and Carolyn Forche.",
        ar: {
          description:
            "مختارات ممثِّلة لشاعر فلسطين الوطني، ترجمها منير عكش وكارولين فورشيه.",
        },
      },
      {
        title: "Things You May Find Hidden in My Ear: Poems from Gaza",
        author: "Mosab Abu Toha",
        year: 2022,
        description:
          "Poems written in and about Gaza before the current war, by a poet and librarian. Winner of the Palestine Book Award; finalist for the National Book Award.",
        ar: {
          description:
            "قصائد كُتبت في غزة وعنها قبل الحرب الحالية، بقلم شاعر وأمين مكتبة. حازت جائزة فلسطين للكتاب، ووصلت إلى القائمة النهائية لجائزة الكتاب الوطني.",
        },
      },
    ],
  },
];
