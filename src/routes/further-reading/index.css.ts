import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const category = style({
  paddingBlock: vars.space[6],
  borderTop: `1px solid ${vars.color.sandLine}`,
});

export const categoryTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.lg,
  margin: 0,
  marginBottom: vars.space[1],
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
  paddingInlineStart: vars.space[3],
  borderInlineStart: `2px solid ${vars.color.sandLine}`,
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
