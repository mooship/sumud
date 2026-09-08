import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

const base = style({
  marginInline: "auto",
  // max() with env() keeps a normal gutter on most devices, but grows past
  // it in landscape on a notched phone so text never sits under the notch.
  paddingLeft: `max(${vars.space[4]}, env(safe-area-inset-left))`,
  paddingRight: `max(${vars.space[4]}, env(safe-area-inset-right))`,
  width: "100%",
  "@media": {
    "screen and (max-width: 40rem)": {
      paddingLeft: `max(${vars.space[3]}, env(safe-area-inset-left))`,
      paddingRight: `max(${vars.space[3]}, env(safe-area-inset-right))`,
    },
  },
});

export const container = styleVariants({
  content: [base, { maxWidth: vars.layout.contentWidth }],
  wide: [base, { maxWidth: vars.layout.wideWidth }],
});
