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

export const section = style({
  paddingBlock: vars.space[6],
  borderTop: `1px solid ${vars.color.sandLine}`,
});

export const sectionTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.lg,
  marginBottom: vars.space[1],
});

export const sectionIntro = style({
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.sm,
  marginBottom: vars.space[4],
  maxWidth: "62ch",
});

export const entryList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space[4],
  margin: 0,
});

export const entry = style({
  paddingLeft: vars.space[3],
  borderLeft: `2px solid ${vars.color.sandLine}`,
});

export const term = style({
  fontWeight: 600,
  color: vars.color.ink,
  fontSize: vars.fontSize.base,
  margin: 0,
});

export const arabic = style({
  fontWeight: 400,
  color: vars.color.inkFaint,
});

export const definition = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.inkMuted,
  margin: "0.25em 0 0",
});
