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
  paddingInlineStart: "1.25em",
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

// Arabic has no true italic (browsers fake a slant), and letter-spacing or case transforms
// pull joined letters apart. Two-class specificity so this wins over any single component
// class; emphasis in Arabic comes from weight or colour instead.
globalStyle(":root :lang(ar)", {
  fontStyle: "normal",
  letterSpacing: "normal",
  textTransform: "none",
});

// Flips a directional icon (an arrow pointing "forward") so it still points the reading
// direction's forward under Arabic. Apply directly to the icon, not a wrapping element.
globalStyle('[dir="rtl"] .rtl-mirror', {
  transform: "scaleX(-1)",
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
