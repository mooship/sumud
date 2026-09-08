import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const skipLink = style({
  position: "absolute",
  left: vars.space[3],
  top: "-3rem",
  zIndex: vars.zIndex.skipLink,
  background: vars.color.ink,
  color: vars.color.bg,
  padding: `${vars.space[1]} ${vars.space[3]}`,
  borderRadius: vars.radius.sm,
  transition: "top 0.15s ease",
  selectors: {
    "&:focus": {
      top: vars.space[3],
    },
  },
});

export const header = style({
  position: "sticky",
  top: 0,
  zIndex: vars.zIndex.header,
  backgroundColor: vars.color.bg,
  borderBottom: `1px solid ${vars.color.sandLine}`,
});

export const bar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space[3],
  minHeight: vars.layout.headerHeight,
});

export const brand = style({
  display: "flex",
  alignItems: "baseline",
  gap: vars.space[1],
  fontFamily: vars.font.serif,
  fontWeight: 600,
  fontSize: vars.fontSize.md,
  textDecoration: "none",
  color: vars.color.ink,
  letterSpacing: "0.01em",
});

export const brandMark = style({
  color: vars.color.terracotta,
});

export const nav = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space[4],
  "@media": {
    "screen and (max-width: 48rem)": {
      display: "none",
    },
  },
});

export const navLink = style({
  fontSize: vars.fontSize.sm,
  fontWeight: 500,
  textDecoration: "none",
  color: vars.color.inkMuted,
  paddingBlock: vars.space[1],
  borderBottom: "2px solid transparent",
  transition: "color 0.15s ease, border-color 0.15s ease",
  selectors: {
    "&:hover": {
      color: vars.color.ink,
    },
    '&[aria-current="page"]': {
      color: vars.color.ink,
      borderBottomColor: vars.color.terracotta,
    },
  },
});

export const menuButton = style({
  display: "none",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: vars.space[1],
  color: vars.color.ink,
  "@media": {
    "screen and (max-width: 48rem)": {
      display: "inline-flex",
    },
  },
});

export const mobileNav = style({
  display: "none",
  flexDirection: "column",
  gap: vars.space[1],
  paddingBlock: vars.space[3],
  borderTop: `1px solid ${vars.color.sandLine}`,
  selectors: {
    '&[data-open="true"]': {
      display: "flex",
    },
  },
  "@media": {
    "screen and (min-width: 48.0625rem)": {
      display: "none !important",
    },
  },
});

export const mobileNavLink = style({
  fontSize: vars.fontSize.base,
  textDecoration: "none",
  color: vars.color.ink,
  padding: `${vars.space[1]} 0`,
});
