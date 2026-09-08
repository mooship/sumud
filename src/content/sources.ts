export interface SourceEntry {
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
        name: "UN Relief and Works Agency for Palestine Refugees (UNRWA)",
        meta: "Situation reports and registration data on Palestine refugees since 1949.",
      },
      {
        name: "UN Office for the Coordination of Humanitarian Affairs -- oPt (OCHA)",
        meta: "Humanitarian situation updates for the West Bank and Gaza Strip.",
      },
      {
        name: "UN General Assembly Resolution 181 (1947) and Resolution 194 (1948)",
        meta: "The partition plan, and the refugee right of return.",
      },
      {
        name: "International Court of Justice, advisory opinions on the separation barrier (2004) and the occupation (2024)",
        meta: "The Court's assessments of the legality of specific Israeli policies under international law.",
      },
    ],
  },
  {
    title: "Historical scholarship",
    entries: [
      {
        name: "Rashid Khalidi, The Hundred Years' War on Palestine (2020)",
        meta: "A history of the conflict told through six defining episodes, by a Palestinian-American historian.",
      },
      {
        name: "Benny Morris, The Birth of the Palestinian Refugee Problem Revisited (2004)",
        meta: "An Israeli historian's archival account of the 1948 exodus, drawing on newly declassified Israeli military records.",
      },
      {
        name: "Ilan Pappe, The Ethnic Cleansing of Palestine (2006)",
        meta: "A more contested, critical account of 1948 by an Israeli historian associated with Israel's 'New Historians'.",
      },
      {
        name: "Edward Said, The Question of Palestine (1979)",
        meta: "An early, influential articulation of the Palestinian national narrative for an English-language audience.",
      },
      {
        name: "Encyclopaedia Britannica, 'Palestine' and 'Israel'",
        meta: "General reference entries used to check dates, figures and place names.",
      },
    ],
  },
  {
    title: "Human rights reporting",
    entries: [
      {
        name: "B'Tselem",
        meta: "Israeli human rights organisation documenting the occupation from within Israel.",
      },
      {
        name: "Al-Haq",
        meta: "Palestinian human rights organisation based in Ramallah, documenting violations in the oPt since 1979.",
      },
      {
        name: "Human Rights Watch and Amnesty International",
        meta: "International organisations' country reporting on Israel and the Occupied Palestinian Territories.",
      },
      {
        name: "International Committee of the Red Cross (ICRC)",
        meta: "Reporting on international humanitarian law as it applies to the occupation and to conduct in Gaza.",
      },
    ],
  },
];
