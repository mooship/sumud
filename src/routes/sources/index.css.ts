import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";
import { anchorTarget } from "~/styles/anchor-target.css";

export const section = style({
  paddingBlock: vars.space[6],
  borderTop: `1px solid ${vars.color.sandLine}`,
});

export const sectionTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.lg,
  marginBottom: vars.space[3],
});

export const entryList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space[4],
});

export const entry = style([
  anchorTarget,
  {
    paddingInlineStart: vars.space[3],
    borderInlineStart: `2px solid ${vars.color.sandLine}`,
  },
]);

export const entryName = style({
  fontWeight: 600,
  color: vars.color.ink,
  fontSize: vars.fontSize.base,
});

export const entryMeta = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.inkMuted,
  margin: "0.25em 0 0",
});

export const correctionBox = style({
  marginTop: vars.space[7],
  padding: vars.space[4],
  backgroundColor: vars.color.oliveLight,
  borderRadius: vars.radius.lg,
});

export const correctionTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.base,
  margin: "0 0 0.5em",
});
