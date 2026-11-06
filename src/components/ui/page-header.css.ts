import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const header = style({
  paddingBlockStart: vars.space[8],
  paddingBlockEnd: vars.space[5],
});

export const compact = style({
  paddingBlockStart: vars.space[6],
  paddingBlockEnd: vars.space[4],
});

export const title = style({
  fontSize: vars.fontSize.xl3,
  maxWidth: "20ch",
});

export const compactTitle = style({
  fontSize: vars.fontSize.xl2,
  maxWidth: "24ch",
});

globalStyle(`${header} > p, ${compact} > p`, {
  maxWidth: "62ch",
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.md,
  lineHeight: vars.lineHeight.relaxed,
});

globalStyle(`${compact} > p`, {
  fontSize: vars.fontSize.base,
});

globalStyle(`${header} a, ${compact} a`, {
  color: vars.color.oliveDark,
  textUnderlineOffset: "0.2em",
});
