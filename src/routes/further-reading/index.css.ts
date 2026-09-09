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

export const category = style({
  paddingBlock: vars.space[6],
  borderTop: `1px solid ${vars.color.sandLine}`,
});

export const categoryTitleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space[2],
  marginBottom: vars.space[1],
});

export const categoryIconBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.5rem",
  height: "2.5rem",
  flexShrink: 0,
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.terracottaLight,
  color: vars.color.terracotta,
});

export const categoryTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.lg,
  margin: 0,
});

export const categoryIntro = style({
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.sm,
  marginBottom: vars.space[4],
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space[4],
});

export const book = style({
  paddingLeft: vars.space[3],
  borderLeft: `2px solid ${vars.color.sandLine}`,
});

export const bookTitle = style({
  fontWeight: 600,
  color: vars.color.ink,
  fontSize: vars.fontSize.base,
});

export const bookMeta = style({
  fontWeight: 400,
  color: vars.color.inkMuted,
});

export const bookDescription = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.inkMuted,
  margin: "0.25em 0 0",
});
