import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const switcher = style({
  display: "inline-flex",
  alignItems: "center",
  minHeight: "2.75rem",
  paddingInline: vars.space[2],
  fontSize: vars.fontSize.sm,
  fontWeight: 500,
  textDecoration: "none",
  color: vars.color.inkMuted,
  border: `1px solid ${vars.color.sandLine}`,
  borderRadius: vars.radius.pill,
  selectors: {
    "&:hover": {
      color: vars.color.ink,
      borderColor: vars.color.inkMuted,
    },
  },
});
