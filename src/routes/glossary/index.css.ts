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

export const entry = style([
  anchorTarget,
  {
    paddingInlineStart: vars.space[3],
    borderInlineStart: `2px solid ${vars.color.sandLine}`,
  },
]);

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
