import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const hero = style({
  position: "relative",
  paddingBlockStart: vars.space[8],
  paddingBlockEnd: vars.space[6],
  overflow: "hidden",
});

export const heroMark = style({
  position: "absolute",
  top: "50%",
  right: "-4rem",
  width: "26rem",
  height: "26rem",
  color: vars.color.olive,
  opacity: 0.07,
  transform: "translateY(-50%) rotate(8deg)",
  pointerEvents: "none",
  "@media": {
    "screen and (max-width: 56rem)": {
      display: "none",
    },
  },
});

export const heroWord = style({
  position: "relative",
  display: "block",
  fontFamily: vars.font.serif,
  color: vars.color.terracotta,
  fontSize: vars.fontSize.lg,
  marginBottom: vars.space[2],
});

export const heroTitle = style({
  position: "relative",
  fontSize: vars.fontSize.xl4,
  marginBottom: vars.space[3],
});

export const heroLede = style({
  position: "relative",
  fontSize: vars.fontSize.md,
  color: vars.color.inkMuted,
  maxWidth: "42ch",
  lineHeight: vars.lineHeight.relaxed,
});

export const heroActions = style({
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space[2],
  marginTop: vars.space[5],
});

export const heroDivider = style({
  position: "relative",
  display: "block",
  marginInline: "auto",
  marginTop: vars.space[6],
  maxWidth: "16rem",
});

export const centeredDivider = style({
  display: "block",
  marginInline: "auto",
  marginBottom: vars.space[6],
  maxWidth: "12rem",
});

export const section = style({
  paddingBlock: vars.space[7],
});

export const sectionAlt = style([
  section,
  {
    backgroundColor: vars.color.bgAlt,
  },
]);

export const eyebrow = style({
  fontSize: vars.fontSize.xs,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.oliveDark,
  marginBottom: vars.space[2],
});

export const sectionTitle = style({
  fontSize: vars.fontSize.xl2,
  maxWidth: "24ch",
});

export const sectionLede = style({
  maxWidth: "60ch",
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.base,
});

export const cardGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: vars.space[4],
  marginTop: vars.space[6],
  "@media": {
    "screen and (max-width: 56rem)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space[2],
  padding: vars.space[4],
  backgroundColor: vars.color.bgRaised,
  border: `1px solid ${vars.color.sandLine}`,
  borderRadius: vars.radius.lg,
  textDecoration: "none",
  color: "inherit",
  boxShadow: vars.shadow.sm,
  transition:
    "border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease",
  selectors: {
    "&:hover": {
      borderColor: vars.color.olive,
      transform: "translateY(-3px)",
      boxShadow: vars.shadow.md,
    },
  },
});

export const cardIconBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "3rem",
  height: "3rem",
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.oliveLight,
  color: vars.color.oliveDark,
  marginBottom: vars.space[1],
});

export const cardTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.md,
  margin: 0,
});

export const cardBody = style({
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.sm,
  margin: 0,
});

export const cardLink = style({
  marginTop: "auto",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space[0.5],
  fontSize: vars.fontSize.xs,
  fontWeight: 600,
  color: vars.color.terracotta,
});

export const timelineStrip = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  marginTop: vars.space[6],
  selectors: {
    "&::before": {
      content: "",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: "9.75rem",
      width: "2px",
      backgroundColor: vars.color.sandLine,
    },
  },
  "@media": {
    "screen and (max-width: 36rem)": {
      selectors: {
        "&::before": { display: "none" },
      },
    },
  },
});

export const timelineItem = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "9rem 1fr",
  alignItems: "baseline",
  gap: vars.space[4],
  paddingBlock: vars.space[3],
  borderTop: `1px solid ${vars.color.sandLine}`,
  textDecoration: "none",
  color: "inherit",
  selectors: {
    "&:last-child": {
      borderBottom: `1px solid ${vars.color.sandLine}`,
    },
  },
  "@media": {
    "screen and (max-width: 36rem)": {
      gridTemplateColumns: "1fr",
      gap: vars.space[0.5],
    },
  },
});

export const timelineDot = style({
  position: "absolute",
  top: "50%",
  left: "9.75rem",
  width: "0.65rem",
  height: "0.65rem",
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.olive,
  border: `2px solid ${vars.color.bgAlt}`,
  transform: "translate(-50%, -50%)",
  transition: "background-color 0.15s ease",
  selectors: {
    [`${timelineItem}:hover &`]: {
      backgroundColor: vars.color.terracotta,
    },
  },
  "@media": {
    "screen and (max-width: 36rem)": {
      display: "none",
    },
  },
});

export const timelineDotCurrent = style([
  timelineDot,
  {
    backgroundColor: vars.color.terracotta,
    boxShadow: `0 0 0 4px ${vars.color.terracottaLight}`,
  },
]);

export const timelineYear = style({
  display: "block",
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.base,
  color: vars.color.oliveDark,
});

export const timelineLabel = style({
  display: "block",
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.md,
  fontWeight: 500,
  transition: "color 0.15s ease",
  selectors: {
    [`${timelineItem}:hover &`]: {
      color: vars.color.terracotta,
    },
  },
});
