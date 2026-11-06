import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

/**
 * Sumud (صمود), "steadfastness". The palette is archival paper, olive and one tatreez red,
 * kept well clear of a literal flag treatment. Contrast for every text pair is checked in
 * both schemes (WCAG 2.2 AA); `sandLine` is for decorative rules only, and anything a
 * reader can click gets the darker `border`.
 */
export const vars = createGlobalTheme(":root", {
  color: {
    bg: "#f6f1e7",
    bgAlt: "#ede5d3",
    bgRaised: "#fbf8f2",
    ink: "#1f1b17",
    inkMuted: "#5a5246",
    inkFaint: "#665e4f",
    olive: "#4a5a35",
    oliveDark: "#34432a",
    oliveLight: "#e3e8d8",
    onOlive: "#ffffff",
    accent: "#8e2b25",
    accentLight: "#f2dfd8",
    sandLine: "#cfc3a8",
    border: "#8a8170",
    focus: "#1d5fae",
    white: "#ffffff",
  },
  font: {
    // Each Latin face is paired with an Arabic one. Neither Latin font has Arabic glyphs, so
    // the browser falls through to the Arabic face character by character, which also covers
    // inline Arabic on English pages.
    sans: "'IBM Plex Sans Variable', 'IBM Plex Sans Arabic', 'IBM Plex Sans Variable fallback', 'IBM Plex Sans Arabic fallback', system-ui, 'Segoe UI', Tahoma, sans-serif",
    serif:
      "'Newsreader Variable', 'Noto Naskh Arabic Variable', 'Newsreader Variable fallback', 'Noto Naskh Arabic Variable fallback', 'Iowan Old Style', Georgia, 'Times New Roman', serif",
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
    contentWidth: "40rem",
    wideWidth: "72rem",
    timelineDateColumn: "9rem",
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
        [vars.color.bg]: "#14120f",
        [vars.color.bgAlt]: "#1c1915",
        [vars.color.bgRaised]: "#211e18",
        [vars.color.ink]: "#ece5d6",
        [vars.color.inkMuted]: "#bdb39f",
        [vars.color.inkFaint]: "#a39a86",
        [vars.color.olive]: "#a3b884",
        [vars.color.oliveDark]: "#b9cb9c",
        [vars.color.oliveLight]: "#2a3324",
        [vars.color.onOlive]: "#14120f",
        [vars.color.accent]: "#e08a74",
        [vars.color.accentLight]: "#3a2620",
        [vars.color.sandLine]: "#3a3327",
        [vars.color.border]: "#7a715f",
        [vars.color.focus]: "#7fb3ff",
      },
    },
  },
});

// Arabic pages: Naskh and Plex Arabic sit lower and need more room between lines than the
// Latin faces, so sizes step up slightly and every line height opens out. Components use
// these tokens, so nothing else has to know about the script.
globalStyle(":root:lang(ar)", {
  vars: {
    [vars.fontSize.xs]: "0.875rem",
    [vars.fontSize.sm]: "1rem",
    [vars.fontSize.base]: "1.125rem",
    [vars.fontSize.md]: "1.25rem",
    [vars.fontSize.lg]: "1.4375rem",
    [vars.lineHeight.tight]: "1.4",
    [vars.lineHeight.snug]: "1.55",
    [vars.lineHeight.normal]: "1.75",
    [vars.lineHeight.relaxed]: "1.85",
  },
});
