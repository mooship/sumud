export interface GlossaryTerm {
  term: string;
  /**
  Arabic script for the term, where the term itself is a transliterated Arabic word.
  */
  arabic?: string;
  definition: string;
}

export interface GlossaryCategory {
  title: string;
  intro: string;
  terms: GlossaryTerm[];
}

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  {
    title: "Core terms",
    intro:
      "Words that recur across this site's history chapters, usually left untranslated because no single English word carries the same weight.",
    terms: [
      {
        term: "Sumud",
        arabic: "صمود",
        definition:
          "Steadfastness: the decision to stay on the land, in the village or the camp, rather than leave, and to keep living and rebuilding in the face of occupation, dispossession or exile. See the Culture & Sumud page for the idea in full.",
      },
      {
        term: "Nakba",
        arabic: "النكبة",
        definition:
          "'The catastrophe': the displacement of more than 700,000 Palestinians and destruction of some 500 villages during the 1947-49 war, marking the founding of the state of Israel and the start of the Palestinian refugee experience.",
      },
      {
        term: "Intifada",
        arabic: "انتفاضة",
        definition:
          "Literally 'shaking off'. Used for two mass Palestinian uprisings against the occupation: the First Intifada (1987-93), largely civil disobedience and strikes, and the more violent Second Intifada (2000-05).",
      },
      {
        term: "Al-awda",
        arabic: "العودة",
        definition:
          "'The return': the right of Palestinian refugees and their descendants to return to the homes and land they were displaced from in 1948, affirmed by UN General Assembly Resolution 194 but never implemented.",
      },
      {
        term: "Al-shatat",
        arabic: "الشتات",
        definition:
          "'The diaspora': Palestinians and their descendants living outside historic Palestine, above all in refugee communities across Jordan, Lebanon and Syria but also scattered across every continent.",
      },
    ],
  },
  {
    title: "Legal and geographic terms",
    intro:
      "Terms that describe status, territory or borders, some of which are themselves disputed.",
    terms: [
      {
        term: "Occupied Palestinian Territories (oPt)",
        definition:
          "The West Bank, including East Jerusalem, and the Gaza Strip: the territory Israel has held under military occupation since the 1967 Six-Day War, as distinct from Israel within its pre-1967 borders.",
      },
      {
        term: "Green Line",
        definition:
          "The armistice line agreed in 1949 after the first Arab-Israeli war, separating Israel from the West Bank and Gaza. It has no formal legal status today but is still used as the reference line for describing settlement expansion beyond it.",
      },
      {
        term: "Settlement",
        definition:
          "A community of Israeli civilians built on land occupied since 1967, populated and governed under Israeli civil law even though the land itself remains, for its Palestinian residents, under military law. Considered illegal under international law by the UN and most states; Israel disputes this for parts of the West Bank.",
      },
      {
        term: "Blockade",
        definition:
          "The land, sea and air restrictions Israel and Egypt have imposed on the Gaza Strip since 2007, controlling the movement of people and the import of goods, including materials needed for reconstruction after each war.",
      },
      {
        term: 'The "yellow line"',
        definition:
          "The line dividing Israeli- and Palestinian-held areas of Gaza under the October 2025 ceasefire agreement, referenced repeatedly in reporting on incidents since the truce began.",
      },
    ],
  },
  {
    title: "Institutions and bodies",
    intro:
      "Organisations and courts named throughout the history chapters. See the Sources page for what each one is cited for.",
    terms: [
      {
        term: "UNRWA",
        definition:
          "The UN Relief and Works Agency for Palestine Refugees, established in 1949 to support Palestinians displaced by the Nakba, and still the main provider of education, healthcare and relief to registered Palestine refugees today.",
      },
      {
        term: "PLO",
        definition:
          "The Palestine Liberation Organization, founded in 1964 as an umbrella political and, at times, military body representing the Palestinian national movement. Distinct from Hamas, which was founded later, in 1987, and has never joined the PLO.",
      },
      {
        term: "International Court of Justice (ICJ)",
        definition:
          "The UN's principal judicial body, based in The Hague, which rules on disputes between states and issues advisory opinions, including on the legality of the separation barrier (2004) and the occupation itself (2024). Not to be confused with the International Criminal Court.",
      },
      {
        term: "International Criminal Court (ICC)",
        definition:
          "A separate court, also in The Hague, that prosecutes individuals for war crimes, crimes against humanity and genocide. Issued arrest warrants over the Gaza war in November 2024. Not to be confused with the International Court of Justice.",
      },
    ],
  },
];
