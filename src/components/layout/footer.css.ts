import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const footer = style({
  borderTop: `1px solid ${vars.color.sandLine}`,
  marginTop: vars.space[6],
  paddingBlock: vars.space[6],
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.sm,
});

export const grid = style({
  display: "grid",
  gap: vars.space[5],
  gridTemplateColumns: "1.4fr 1fr 1fr",
  "@media": {
    "screen and (max-width: 48rem)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const heading = style({
  fontFamily: vars.font.serif,
  color: vars.color.ink,
  fontSize: vars.fontSize.base,
  margin: `0 0 ${vars.space[2]}`,
});

export const list = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.space[1],
});

export const link = style({
  textDecoration: "none",
  color: vars.color.inkMuted,
  selectors: {
    "&:hover": {
      color: vars.color.ink,
      textDecoration: "underline",
    },
  },
});

export const externalIcon = style({
  display: "inline-block",
  verticalAlign: "-0.15em",
  marginLeft: "0.2em",
});
