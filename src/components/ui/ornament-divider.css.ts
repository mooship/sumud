import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const divider = style({
  display: "block",
  width: "100%",
  height: "0.875rem",
  color: vars.color.sandLine,
});

export const oliveTone = style({
  color: vars.color.olive,
  opacity: 0.5,
});
