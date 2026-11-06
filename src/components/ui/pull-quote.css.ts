import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const figure = style({
  margin: `${vars.space[4]} 0`,
  maxWidth: "34ch",
  marginInline: "auto",
  textAlign: "center",
});

// Set large and upright. On Arabic pages the global :lang(ar) rule keeps it upright anyway;
// weight and colour carry the emphasis in both scripts.
export const quote = style({
  fontFamily: vars.font.serif,
  fontWeight: 500,
  fontSize: vars.fontSize.xl,
  lineHeight: vars.lineHeight.snug,
  color: vars.color.oliveDark,
  margin: 0,
});

export const cite = style({
  display: "block",
  marginTop: vars.space[3],
  fontFamily: vars.font.sans,
  fontSize: vars.fontSize.sm,
  color: vars.color.inkFaint,
});
