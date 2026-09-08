import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const figure = style({
  margin: `${vars.space[4]} 0`,
  maxWidth: "38ch",
  marginInline: "auto",
  textAlign: "center",
});

export const mark = style({
  color: vars.color.terracotta,
  opacity: 0.6,
  marginBottom: vars.space[1],
});

export const quote = style({
  fontFamily: vars.font.serif,
  fontStyle: "italic",
  fontWeight: 500,
  fontSize: vars.fontSize.lg,
  lineHeight: vars.lineHeight.snug,
  color: vars.color.ink,
  margin: 0,
});

export const cite = style({
  display: "block",
  marginTop: vars.space[3],
  fontFamily: vars.font.sans,
  fontStyle: "normal",
  fontSize: vars.fontSize.xs,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: vars.color.inkFaint,
});
