export interface NavItem {
  href: string;
  label: string;
  /**
  Arabic translation of `label`, used on the `/ar/` route tree.
  */
  labelAr: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/history/", label: "History", labelAr: "التاريخ" },
  {
    href: "/culture/",
    label: "Culture and sumud",
    labelAr: "الثقافة والصمود",
  },
  {
    href: "/further-reading/",
    label: "Further reading",
    labelAr: "قراءات إضافية",
  },
  { href: "/glossary/", label: "Glossary", labelAr: "المصطلحات" },
  { href: "/sources/", label: "Sources", labelAr: "المصادر" },
  { href: "/take-action/", label: "Take action", labelAr: "بادر بالفعل" },
  { href: "/search/", label: "Search", labelAr: "بحث" },
  { href: "/about/", label: "About", labelAr: "عن الموقع" },
];
