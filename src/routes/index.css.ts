import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const hero = style({
  paddingBlock: vars.space[8],
  borderBottom: `1px solid ${vars.color.sandLine}`,
});

export const heroWord = style({
  display: "block",
  fontFamily: vars.font.serif,
  color: vars.color.terracotta,
  fontSize: vars.fontSize.lg,
  marginBottom: vars.space[2],
});

export const heroTitle = style({
  fontSize: vars.fontSize.xl4,
  marginBottom: vars.space[3],
});

export const heroLede = style({
  fontSize: vars.fontSize.md,
  color: vars.color.inkMuted,
  maxWidth: "42ch",
  lineHeight: vars.lineHeight.relaxed,
});

export const heroActions = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space[2],
  marginTop: vars.space[5],
});

export const section = style({
  paddingBlock: vars.space[8],
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
  transition: "border-color 0.15s ease, transform 0.15s ease",
  selectors: {
    "&:hover": {
      borderColor: vars.color.olive,
      transform: "translateY(-2px)",
    },
  },
});

export const cardIcon = style({
  color: vars.color.olive,
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
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space[3],
  marginTop: vars.space[6],
});

export const timelineItem = style({
  flex: "1 1 12rem",
  paddingLeft: vars.space[3],
  borderLeft: `2px solid ${vars.color.olive}`,
});

export const timelineYear = style({
  display: "block",
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.base,
  color: vars.color.oliveDark,
});

export const timelineLabel = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.inkMuted,
});
