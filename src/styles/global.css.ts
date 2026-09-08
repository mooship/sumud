import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("html", {
  colorScheme: "light dark",
  textSizeAdjust: "100%",
  scrollBehavior: "smooth",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      scrollBehavior: "auto",
    },
  },
});

globalStyle("body", {
  margin: 0,
  minHeight: "100dvh",
  backgroundColor: vars.color.bg,
  // A very fine paper-grain texture -- a nod to parchment, at an opacity
  // low enough that it reads as texture rather than pattern.
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.14 0 0 0 0 0.12 0 0 0 0 0.11 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
  backgroundRepeat: "repeat",
  color: vars.color.ink,
  fontFamily: vars.font.sans,
  fontSize: vars.fontSize.base,
  lineHeight: vars.lineHeight.normal,
  textRendering: "optimizeLegibility",
  WebkitFontSmoothing: "antialiased",
  // Keeps content clear of the home-indicator area on notched iOS devices
  // (only non-zero once viewport-fit=cover is set, see root.tsx).
  paddingBottom: "env(safe-area-inset-bottom, 0px)",
});

globalStyle("img, picture, svg, video", {
  display: "block",
  maxWidth: "100%",
});

globalStyle("h1, h2, h3, h4", {
  fontFamily: vars.font.serif,
  fontWeight: 600,
  lineHeight: vars.lineHeight.tight,
  color: vars.color.ink,
  margin: "0 0 0.6em",
  textWrap: "balance",
});

globalStyle("p", {
  margin: "0 0 1em",
  textWrap: "pretty",
});

globalStyle("ul, ol", {
  paddingLeft: "1.25em",
});

globalStyle("a", {
  color: "inherit",
});

globalStyle("button", {
  font: "inherit",
  color: "inherit",
});

globalStyle(":focus-visible", {
  outline: `2px solid ${vars.color.focus}`,
  outlineOffset: "2px",
});

globalStyle("::selection", {
  backgroundColor: vars.color.oliveLight,
  color: vars.color.oliveDark,
});

globalStyle(".visually-hidden", {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});

globalStyle("*", {
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animationDuration: "0.01ms !important",
      animationIterationCount: "1 !important",
      transitionDuration: "0.01ms !important",
    },
  },
});
