import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

// Fixed to the bottom of the viewport so that appearing after hydration doesn't push the page
// down (it used to sit above the header and caused a layout shift).
export const banner = style({
  position: "fixed",
  insetInline: 0,
  insetBlockEnd: 0,
  zIndex: vars.zIndex.overlay,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space[3],
  paddingBlockStart: vars.space[2],
  paddingBlockEnd: `max(${vars.space[2]}, env(safe-area-inset-bottom))`,
  paddingInline: vars.space[3],
  backgroundColor: vars.color.oliveLight,
  color: vars.color.ink,
  fontSize: vars.fontSize.sm,
  borderTop: `1px solid ${vars.color.border}`,
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
  minBlockSize: "24px",
  background: "none",
  border: "none",
  padding: `${vars.space[0.5]} ${vars.space[1]}`,
  color: vars.color.inkMuted,
  textDecoration: "underline",
  cursor: "pointer",
  font: "inherit",
});
