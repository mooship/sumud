export interface SourceEntry {
  /**
  Stable slug used to deep-link a specific citation to this entry, e.g. "/sources/#unrwa".
  */
  id: string;
  name: string;
  meta: string;
}

export interface SourceSection {
  title: string;
  entries: SourceEntry[];
}

export const SOURCE_SECTIONS: SourceSection[] = [
  {
    title: "Institutional and archival records",
    entries: [
      {
        id: "unrwa",
        name: "UN Relief and Works Agency for Palestine Refugees (UNRWA)",
        meta: "Situation reports and registration data on Palestine refugees since 1949.",
      },
      {
        id: "ocha",
        name: "UN Office for the Coordination of Humanitarian Affairs -- oPt (OCHA)",
        meta: "Humanitarian situation updates for the West Bank and Gaza Strip.",
      },
      {
        id: "un-resolutions-181-194",
        name: "UN General Assembly Resolution 181 (1947) and Resolution 194 (1948)",
        meta: "The partition plan, and the refugee right of return.",
      },
      {
        id: "icj",
        name: "International Court of Justice, advisory opinions on the separation barrier (2004) and the occupation (2024)",
        meta: "The Court's assessments of the legality of specific Israeli policies under international law.",
      },
    ],
  },
  {
    title: "Historical scholarship",
    entries: [
      {
        id: "khalidi-hundred-years-war",
        name: "Rashid Khalidi, The Hundred Years' War on Palestine (2020)",
        meta: "A history of the conflict told through six defining episodes, by a Palestinian-American historian.",
      },
      {
        id: "morris-refugee-problem-revisited",
        name: "Benny Morris, The Birth of the Palestinian Refugee Problem Revisited (2004)",
        meta: "An Israeli historian's archival account of the 1948 exodus, drawing on newly declassified Israeli military records.",
      },
      {
        id: "pappe-ethnic-cleansing",
        name: "Ilan Pappe, The Ethnic Cleansing of Palestine (2006)",
        meta: "A more contested, critical account of 1948 by an Israeli historian associated with Israel's 'New Historians'.",
      },
      {
        id: "said-question-of-palestine",
        name: "Edward Said, The Question of Palestine (1979)",
        meta: "An early, influential articulation of the Palestinian national narrative for an English-language audience.",
      },
      {
        id: "britannica",
        name: "Encyclopaedia Britannica, 'Palestine' and 'Israel'",
        meta: "General reference entries used to check dates, figures and place names.",
      },
    ],
  },
  {
    title: "Human rights reporting",
    entries: [
      {
        id: "btselem",
        name: "B'Tselem",
        meta: "Israeli human rights organisation documenting the occupation from within Israel.",
      },
      {
        id: "al-haq",
        name: "Al-Haq",
        meta: "Palestinian human rights organisation based in Ramallah, documenting violations in the oPt since 1979.",
      },
      {
        id: "hrw-amnesty",
        name: "Human Rights Watch and Amnesty International",
        meta: "International organisations' country reporting on Israel and the Occupied Palestinian Territories.",
      },
      {
        id: "icrc",
        name: "International Committee of the Red Cross (ICRC)",
        meta: "Reporting on international humanitarian law as it applies to the occupation and to conduct in Gaza.",
      },
    ],
  },
  {
    title: "Gaza war reporting, 2023 to present",
    entries: [
      {
        id: "gaza-health-ministry",
        name: "Gaza's Ministry of Health",
        meta: "The Gaza health authorities' running casualty count for the war, run under Hamas but assessed by the UN in this and prior conflicts as broadly reliable.",
      },
      {
        id: "world-bank",
        name: "World Bank Group, joint damage and needs assessments",
        meta: "Assessments produced with the UN and European Union of destroyed housing, hospitals and infrastructure across Gaza.",
      },
      {
        id: "ohchr",
        name: "UN Office of the High Commissioner for Human Rights (OHCHR)",
        meta: "The UN's human rights office, led since 2022 by Volker Türk, monitoring conduct in Gaza and the West Bank.",
      },
      {
        id: "ipc-famine-classification",
        name: "Integrated Food Security Phase Classification (IPC)",
        meta: "The UN-backed international system for classifying food insecurity and famine, which found famine conditions in parts of Gaza in 2025.",
      },
      {
        id: "icc",
        name: "International Criminal Court (ICC)",
        meta: "The Hague-based court that issued arrest warrants over the war in November 2024.",
      },
    ],
  },
];
