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
