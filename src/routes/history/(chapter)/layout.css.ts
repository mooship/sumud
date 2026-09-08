import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const backLink = style({
  display: "flex",
  width: "fit-content",
  alignItems: "center",
  gap: vars.space[0.5],
  fontSize: vars.fontSize.xs,
  fontWeight: 600,
  color: vars.color.inkMuted,
  textDecoration: "none",
  marginBottom: vars.space[4],
  selectors: {
    "&:hover": { color: vars.color.ink },
  },
});

export const header = style({
  paddingBlockStart: vars.space[6],
  paddingBlockEnd: vars.space[5],
  borderBottom: `1px solid ${vars.color.sandLine}`,
  marginBottom: vars.space[6],
});

export const period = style({
  display: "block",
  fontSize: vars.fontSize.xs,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: vars.color.terracotta,
  marginBottom: vars.space[1],
});

export const title = style({
  fontSize: vars.fontSize.xl3,
  margin: 0,
});

export const chapterNav = style({
  display: "flex",
  justifyContent: "space-between",
  gap: vars.space[3],
  marginTop: vars.space[8],
  paddingTop: vars.space[5],
  borderTop: `1px solid ${vars.color.sandLine}`,
  fontSize: vars.fontSize.sm,
});

export const chapterNavLink = style({
  textDecoration: "none",
  color: vars.color.oliveDark,
  fontWeight: 600,
  maxWidth: "45%",
});

export const chapterNavLabel = style({
  display: "block",
  fontSize: vars.fontSize.xs,
  color: vars.color.inkFaint,
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  marginBottom: "0.2em",
});
