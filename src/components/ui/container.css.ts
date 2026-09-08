import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

const base = style({
  marginInline: "auto",
  paddingInline: vars.space[4],
  width: "100%",
  "@media": {
    "screen and (max-width: 40rem)": {
      paddingInline: vars.space[3],
    },
  },
});

export const container = styleVariants({
  content: [base, { maxWidth: vars.layout.contentWidth }],
  wide: [base, { maxWidth: vars.layout.wideWidth }],
});
