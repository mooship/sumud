import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

/**
 * Sumud (صمود) -- "steadfastness". The palette draws on the land itself: olive
 * groves, sun-worn stone, parchment -- rather than a literal flag treatment.
 */
export const vars = createGlobalTheme(":root", {
  color: {
    bg: "#faf6ef",
    bgAlt: "#f1ead9",
    bgRaised: "#ffffff",
    ink: "#241f1c",
    inkMuted: "#5b5348",
    inkFaint: "#6b6353",
    olive: "#4b5d3a",
    oliveDark: "#34432a",
    oliveLight: "#e4e9db",
    terracotta: "#a9432f",
    terracottaLight: "#f4e0da",
    sandLine: "#ded2b8",
    focus: "#1d5fae",
    white: "#ffffff",
  },
  font: {
    sans: "'Inter Variable', 'Inter Variable fallback', system-ui, 'Segoe UI', sans-serif",
    serif:
      "'Newsreader Variable', 'Newsreader Variable fallback', 'Iowan Old Style', Georgia, serif",
  },
  fontSize: {
    xs: "0.8125rem",
    sm: "0.9375rem",
    base: "1.0625rem",
    md: "1.1875rem",
    lg: "1.375rem",
    xl: "1.75rem",
    xl2: "clamp(2rem, 1.6rem + 1.8vw, 2.75rem)",
    xl3: "clamp(2.5rem, 1.9rem + 2.6vw, 3.75rem)",
    xl4: "clamp(3rem, 2rem + 4vw, 4.75rem)",
  },
  lineHeight: {
    tight: "1.15",
    snug: "1.35",
    normal: "1.5",
    relaxed: "1.7",
  },
  space: {
    px: "1px",
    0.5: "0.25rem",
    1: "0.5rem",
    2: "0.75rem",
    3: "1rem",
    4: "1.5rem",
    5: "2rem",
    6: "2.5rem",
    7: "3.5rem",
    8: "5rem",
    9: "7rem",
    10: "9rem",
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    pill: "999px",
  },
  shadow: {
    sm: "0 1px 2px rgba(36, 31, 28, 0.06)",
    md: "0 4px 16px rgba(36, 31, 28, 0.08)",
    lg: "0 12px 36px rgba(36, 31, 28, 0.12)",
  },
  layout: {
    contentWidth: "42rem",
    wideWidth: "72rem",
    headerHeight: "4rem",
  },
  zIndex: {
    header: "40",
    overlay: "50",
    skipLink: "60",
  },
});

globalStyle(":root", {
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [vars.color.bg]: "#151310",
        [vars.color.bgAlt]: "#1d1a15",
        [vars.color.bgRaised]: "#211e18",
        [vars.color.ink]: "#f2ecdf",
        [vars.color.inkMuted]: "#bdb39f",
        [vars.color.inkFaint]: "#8c8471",
        [vars.color.olive]: "#93ac74",
        [vars.color.oliveDark]: "#71895a",
        [vars.color.oliveLight]: "#2a3324",
        [vars.color.terracotta]: "#e2896b",
        [vars.color.terracottaLight]: "#3a2620",
        [vars.color.sandLine]: "#3a3327",
        [vars.color.focus]: "#7fb3ff",
      },
    },
  },
});
