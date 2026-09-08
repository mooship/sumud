export interface Organisation {
  name: string;
  url: string;
  description: string;
}

export interface OrgGroup {
  title: string;
  intro: string;
  orgs: Organisation[];
}

export const ORG_GROUPS: OrgGroup[] = [
  {
    title: "Humanitarian aid",
    intro:
      "Organisations providing food, medical care, water and shelter directly.",
    orgs: [
      {
        name: "UNRWA",
        url: "https://www.unrwa.org/",
        description:
          "The UN agency supporting Palestine refugees with education, healthcare and relief across Gaza, the West Bank, Jordan, Lebanon and Syria since 1949.",
      },
      {
        name: "Palestine Red Crescent Society",
        url: "https://www.palestinercs.org/en",
        description:
          "The primary emergency medical and ambulance service for Palestinians in Gaza and the West Bank.",
      },
      {
        name: "Medical Aid for Palestinians (MAP)",
        url: "https://www.map.org.uk/",
        description:
          "A UK-based charity funding healthcare and medical supplies in Gaza and the West Bank.",
      },
      {
        name: "Médecins Sans Frontières (MSF)",
        url: "https://www.msf.org/",
        description:
          "Independent medical humanitarian organisation operating in Gaza and the West Bank.",
      },
      {
        name: "International Committee of the Red Cross (ICRC)",
        url: "https://www.icrc.org/",
        description:
          "Neutral humanitarian organisation working on protection, medical care and family reunification.",
      },
    ],
  },
  {
    title: "Human rights and documentation",
    intro:
      "Organisations investigating and documenting violations of international law, from across the region.",
    orgs: [
      {
        name: "B'Tselem",
        url: "https://www.btselem.org/",
        description:
          "Israeli human rights organisation documenting the occupation since 1989.",
      },
      {
        name: "Al-Haq",
        url: "https://www.alhaq.org/",
        description:
          "Palestinian human rights organisation based in Ramallah, documenting violations since 1979.",
      },
      {
        name: "Human Rights Watch",
        url: "https://www.hrw.org/middle-east/north-africa/israel/palestine",
        description:
          "International organisation reporting on Israel, Gaza and the West Bank.",
      },
      {
        name: "Amnesty International",
        url: "https://www.amnesty.org/en/location/middle-east-and-north-africa/israel-and-the-occupied-palestinian-territories/",
        description:
          "International human rights organisation with dedicated Israel/Palestine reporting.",
      },
    ],
  },
];
