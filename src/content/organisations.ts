export interface OrganisationTranslation {
  description: string;
}

export interface Organisation {
  name: string;
  url: string;
  description: string;
  /**
  Arabic translation of `description`, used on the `/ar/` route tree.
  */
  ar: OrganisationTranslation;
}

export interface OrgGroupTranslation {
  title: string;
  intro: string;
}

export interface OrgGroup {
  title: string;
  intro: string;
  orgs: Organisation[];
  /**
  Arabic translation of `title`/`intro`, used on the `/ar/` route tree.
  */
  ar: OrgGroupTranslation;
}

export const ORG_GROUPS: OrgGroup[] = [
  {
    title: "Humanitarian aid",
    intro:
      "Organisations providing food, medical care, water and shelter directly.",
    ar: {
      title: "المساعدات الإنسانية",
      intro: "منظمات تقدّم الغذاء والرعاية الطبية والمياه والمأوى مباشرة.",
    },
    orgs: [
      {
        name: "UNRWA",
        url: "https://www.unrwa.org/",
        description:
          "The UN agency supporting Palestine refugees with education, healthcare and relief across Gaza, the West Bank, Jordan, Lebanon and Syria since 1949.",
        ar: {
          description:
            "وكالة الأمم المتحدة التي تدعم اللاجئين الفلسطينيين بالتعليم والرعاية الصحية والإغاثة في غزة والضفة الغربية والأردن ولبنان وسوريا منذ عام 1949.",
        },
      },
      {
        name: "Palestine Red Crescent Society",
        url: "https://www.palestinercs.org/en",
        description:
          "The primary emergency medical and ambulance service for Palestinians in Gaza and the West Bank.",
        ar: {
          description:
            "خدمة الطوارئ الطبية والإسعاف الرئيسية للفلسطينيين في غزة والضفة الغربية.",
        },
      },
      {
        name: "Medical Aid for Palestinians (MAP)",
        url: "https://www.map.org.uk/",
        description:
          "A UK-based charity funding healthcare and medical supplies in Gaza and the West Bank.",
        ar: {
          description:
            "جمعية خيرية مقرها المملكة المتحدة تموّل الرعاية الصحية والإمدادات الطبية في غزة والضفة الغربية.",
        },
      },
      {
        name: "Médecins Sans Frontières (MSF)",
        url: "https://www.msf.org/",
        description:
          "Independent medical humanitarian organisation operating in Gaza and the West Bank.",
        ar: {
          description: "منظمة طبية إنسانية مستقلة تعمل في غزة والضفة الغربية.",
        },
      },
      {
        name: "International Committee of the Red Cross (ICRC)",
        url: "https://www.icrc.org/",
        description:
          "Neutral humanitarian organisation working on protection, medical care and family reunification.",
        ar: {
          description:
            "منظمة إنسانية محايدة تعمل على الحماية والرعاية الطبية ولمّ شمل العائلات.",
        },
      },
    ],
  },
  {
    title: "Human rights and documentation",
    intro:
      "Organisations investigating and documenting violations of international law, from across the region.",
    ar: {
      title: "حقوق الإنسان والتوثيق",
      intro:
        "منظمات من مختلف أنحاء المنطقة تحقق في انتهاكات القانون الدولي وتوثقها.",
    },
    orgs: [
      {
        name: "B'Tselem",
        url: "https://www.btselem.org/",
        description:
          "Israeli human rights organisation documenting the occupation since 1989.",
        ar: {
          description: "منظمة حقوق إنسان إسرائيلية توثق الاحتلال منذ عام 1989.",
        },
      },
      {
        name: "Al-Haq",
        url: "https://www.alhaq.org/",
        description:
          "Palestinian human rights organisation based in Ramallah, documenting violations since 1979.",
        ar: {
          description:
            "منظمة حقوق إنسان فلسطينية مقرها رام الله، توثق الانتهاكات منذ عام 1979.",
        },
      },
      {
        name: "Human Rights Watch",
        url: "https://www.hrw.org/middle-east/north-africa/israel/palestine",
        description:
          "International organisation reporting on Israel, Gaza and the West Bank.",
        ar: {
          description:
            "منظمة دولية تُصدر تقارير حول إسرائيل وغزة والضفة الغربية.",
        },
      },
      {
        name: "Amnesty International",
        url: "https://www.amnesty.org/en/location/middle-east-and-north-africa/israel-and-the-occupied-palestinian-territories/",
        description:
          "International human rights organisation with dedicated Israel/Palestine reporting.",
        ar: {
          description:
            "منظمة حقوق إنسان دولية لديها تغطية مخصصة لإسرائيل وفلسطين.",
        },
      },
    ],
  },
];
