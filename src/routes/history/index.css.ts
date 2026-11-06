import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

// The rail sits in the middle of the gap between the date column and the text.
const railInset = `calc(${vars.layout.timelineDateColumn} + ${vars.space[4]} / 2)`;

export const list = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  paddingBottom: vars.space[8],
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      top: 0,
      bottom: 0,
      insetInlineStart: railInset,
      width: "2px",
      backgroundColor: vars.color.sandLine,
    },
  },
  "@media": {
    "screen and (max-width: 36rem)": {
      selectors: {
        "&::before": { display: "none" },
      },
    },
  },
});

export const itemPeriod = style({
  fontFamily: vars.font.serif,
  color: vars.color.oliveDark,
  fontSize: vars.fontSize.base,
});

export const itemDot = style({
  position: "absolute",
  // Aligned to sit level with the chapter title, not the row's vertical
  // centre, because rows vary in height with summary length, the title doesn't.
  top: `calc(${vars.space[5]} + 0.7em)`,
  insetInlineStart: railInset,
  width: "0.6rem",
  height: "0.6rem",
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.accent,
  border: `2px solid ${vars.color.bg}`,
  transform: "translate(-50%, -50%)",
  "@media": {
    "screen and (max-width: 36rem)": {
      display: "none",
    },
  },
});

export const item = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: `${vars.layout.timelineDateColumn} 1fr`,
  gap: vars.space[4],
  paddingBlock: vars.space[5],
  borderTop: `1px solid ${vars.color.sandLine}`,
  textDecoration: "none",
  color: "inherit",
  selectors: {
    "&:last-child": {
      borderBottom: `1px solid ${vars.color.sandLine}`,
    },
  },
  "@media": {
    "screen and (max-width: 36rem)": {
      gridTemplateColumns: "1fr",
      gap: vars.space[1],
    },
  },
});

export const itemTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.lg,
  margin: "0 0 0.3em",
  transition: "color 0.15s ease",
  selectors: {
    [`${item}:hover &`]: {
      color: vars.color.accent,
    },
  },
});

export const itemSummary = style({
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.sm,
  maxWidth: "62ch",
  margin: 0,
});
