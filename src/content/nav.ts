export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/history/", label: "History" },
  { href: "/culture/", label: "Culture & Sumud" },
  { href: "/sources/", label: "Sources" },
  { href: "/take-action/", label: "Take Action" },
  { href: "/about/", label: "About" },
];
