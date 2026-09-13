import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const banner = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space[3],
  paddingBlock: vars.space[2],
  paddingInline: vars.space[3],
  backgroundColor: vars.color.oliveLight,
  color: vars.color.ink,
  fontSize: vars.fontSize.sm,
  borderBottom: `1px solid ${vars.color.sandLine}`,
  textAlign: "center",
});

export const text = style({
  margin: 0,
});

export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space[2],
  flexShrink: 0,
});

export const accept = style({
  fontWeight: 600,
  color: vars.color.oliveDark,
  textDecoration: "underline",
});

export const dismiss = style({
  background: "none",
  border: "none",
  padding: 0,
  color: vars.color.inkMuted,
  textDecoration: "underline",
  cursor: "pointer",
  font: "inherit",
});
