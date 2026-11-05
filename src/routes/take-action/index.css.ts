import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const header = style({
  paddingBlockStart: vars.space[7],
  paddingBlockEnd: vars.space[5],
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
  maxWidth: "20ch",
});

export const lede = style({
  maxWidth: "62ch",
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.md,
  lineHeight: vars.lineHeight.relaxed,
});

export const group = style({
  paddingBlock: vars.space[6],
  borderTop: `1px solid ${vars.color.sandLine}`,
});

export const groupTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.lg,
  marginBottom: vars.space[1],
});

export const groupIntro = style({
  maxWidth: "60ch",
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.sm,
  marginBottom: vars.space[4],
});

export const list = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  borderTop: `1px solid ${vars.color.sandLine}`,
});

export const item = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 14rem) minmax(0, 1fr)",
  columnGap: vars.space[4],
  rowGap: vars.space[1],
  alignItems: "baseline",
  paddingBlock: vars.space[3],
  borderBottom: `1px solid ${vars.color.sandLine}`,
  "@media": {
    "screen and (max-width: 40rem)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const orgLink = style({
  fontWeight: 600,
  color: vars.color.ink,
  textDecorationColor: vars.color.sandLine,
  textUnderlineOffset: "0.2em",
  selectors: {
    "&:hover": {
      color: vars.color.terracotta,
      textDecorationColor: "currentColor",
    },
  },
});

export const orgIcon = style({
  display: "inline-block",
  marginInlineStart: "0.3em",
  verticalAlign: "-0.1em",
  color: vars.color.inkFaint,
});

export const orgDescription = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.inkMuted,
  margin: 0,
});
