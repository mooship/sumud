export interface Book {
  title: string;
  author: string;
  year: number;
  description: string;
}

export interface BookCategory {
  title: string;
  intro: string;
  books: Book[];
}

export const BOOK_CATEGORIES: BookCategory[] = [
  {
    title: "History & politics",
    intro:
      "Accounts of how Palestine got to where it is, from historians and political writers across the spectrum of opinion.",
    books: [
      {
        title: "The Hundred Years' War on Palestine",
        author: "Rashid Khalidi",
        year: 2020,
        description:
          "A history of the conflict told through six defining episodes and three generations of one Palestinian family, drawing on the author's own family archive.",
      },
      {
        title: "The Ethnic Cleansing of Palestine",
        author: "Ilan Pappe",
        year: 2006,
        description:
          "An Israeli historian's account of the 1948 expulsions, drawing on newly opened Israeli military archives. Contested: other historians who have read the same archives describe the same events in less deliberate terms.",
      },
      {
        title: "The Question of Palestine",
        author: "Edward Said",
        year: 1979,
        description:
          "An early, influential articulation of the Palestinian case for an English-language audience, from the literary critic and public intellectual.",
      },
      {
        title: "A Day in the Life of Abed Salama",
        author: "Nathan Thrall",
        year: 2023,
        description:
          "A single 2012 bus crash near Jerusalem, and the maze of permits, checkpoints and jurisdictions a Palestinian father has to navigate to reach his injured son. Winner of the Pulitzer Prize for General Nonfiction.",
      },
    ],
  },
  {
    title: "Memoir & testimony",
    intro: "First-person accounts of life under occupation, exile and war.",
    books: [
      {
        title: "Palestinian Walks: Notes on a Vanishing Landscape",
        author: "Raja Shehadeh",
        year: 2007,
        description:
          "Six walks through the hills around Ramallah over 26 years, watching the landscape close under settlement and checkpoint. Winner of the Orwell Prize.",
      },
      {
        title: "In Search of Fatima: A Palestinian Story",
        author: "Ghada Karmi",
        year: 2002,
        description:
          "A memoir of childhood in Jerusalem before 1948, exile in London, and a fraught return decades later.",
      },
      {
        title: "Don't Look Left: A Diary of Genocide",
        author: "Atef Abu Saif",
        year: 2024,
        description:
          "A Gaza-based writer's diary of the war's first months, written from inside it while displaced with his family.",
      },
    ],
  },
  {
    title: "Fiction",
    intro:
      "Novels and short fiction, some of it foundational to Palestinian literature and some of it very recent.",
    books: [
      {
        title: "Men in the Sun",
        author: "Ghassan Kanafani",
        year: 1963,
        description:
          "A short novel about three refugees smuggled across the desert to Kuwait in an empty water tanker, foundational to modern Palestinian literature.",
      },
      {
        title: "Mornings in Jenin",
        author: "Susan Abulhawa",
        year: 2010,
        description:
          "A multigenerational family saga spanning 1948 to the second intifada, following one family displaced from their village near Haifa.",
      },
      {
        title: "Minor Detail",
        author: "Adania Shibli",
        year: 2020,
        description:
          "A taut, formally daring novel linking a 1949 atrocity to a present-day search for the truth about it. Shortlisted for the International Booker Prize.",
      },
      {
        title: "Enter Ghost",
        author: "Isabella Hammad",
        year: 2023,
        description:
          "A London-based actress returns to Haifa and joins a West Bank production of Hamlet, staged across the fault lines of occupation.",
      },
    ],
  },
  {
    title: "Poetry",
    intro: "Palestinian poets, in translation and in English.",
    books: [
      {
        title: "Unfortunately, It Was Paradise: Selected Poems",
        author: "Mahmoud Darwish",
        year: 2003,
        description:
          "A representative selection from Palestine's national poet, translated by Munir Akash and Carolyn Forche.",
      },
      {
        title: "Things You May Find Hidden in My Ear: Poems from Gaza",
        author: "Mosab Abu Toha",
        year: 2022,
        description:
          "Poems written in and about Gaza before the current war, by a poet and librarian. Winner of the Palestine Book Award; finalist for the National Book Award.",
      },
    ],
  },
];
