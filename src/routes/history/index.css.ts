import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const header = style({
  paddingBlockStart: vars.space[7],
  paddingBlockEnd: vars.space[6],
});

export const eyebrow = style({
  fontSize: vars.fontSize.xs,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.oliveDark,
  marginBottom: vars.space[2],
});

export const title = style({
  fontSize: vars.fontSize.xl3,
  maxWidth: "18ch",
});

export const lede = style({
  maxWidth: "60ch",
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.md,
  lineHeight: vars.lineHeight.relaxed,
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  paddingBottom: vars.space[8],
});

export const itemPeriod = style({
  fontFamily: vars.font.serif,
  color: vars.color.oliveDark,
  fontSize: vars.fontSize.base,
});

export const item = style({
  display: "grid",
  gridTemplateColumns: "9rem 1fr",
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
      color: vars.color.terracotta,
    },
  },
});

export const itemSummary = style({
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.sm,
  maxWidth: "62ch",
  margin: 0,
});
