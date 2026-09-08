import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

const base = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space[1],
  fontSize: vars.fontSize.sm,
  fontWeight: 600,
  textDecoration: "none",
  borderRadius: vars.radius.pill,
  paddingBlock: vars.space[2],
  paddingInline: vars.space[4],
  border: "1px solid transparent",
  transition:
    "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease",
  cursor: "pointer",
});

export const variant = styleVariants({
  primary: [
    base,
    {
      backgroundColor: vars.color.olive,
      color: vars.color.white,
      selectors: {
        "&:hover": { backgroundColor: vars.color.oliveDark },
      },
    },
  ],
  secondary: [
    base,
    {
      backgroundColor: "transparent",
      color: vars.color.ink,
      borderColor: vars.color.sandLine,
      selectors: {
        "&:hover": { borderColor: vars.color.ink },
      },
    },
  ],
});
