import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const page = style({
  paddingBlock: `${vars.space[8]} ${vars.space[9]}`,
});

export const ornament = style({
  maxWidth: "10rem",
  marginInline: 0,
  marginBlockEnd: vars.space[5],
});

export const title = style({
  fontSize: vars.fontSize.xl3,
  maxWidth: "20ch",
});

export const body = style({
  fontSize: vars.fontSize.md,
  color: vars.color.inkMuted,
});
