import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const hero = style({ paddingBlock: vars.space[7] });

export const heroGrid = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1fr)",
  alignItems: "center",
  gap: vars.space[8],
  "@media": {
    "screen and (max-width: 56rem)": {
      gridTemplateColumns: "1fr",
      gap: vars.space[6],
    },
  },
});

export const heroTitle = style({
  fontSize: vars.fontSize.xl4,
  marginBottom: vars.space[2],
});

export const heroSubtitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.xl,
  lineHeight: vars.lineHeight.snug,
  maxWidth: "28ch",
});

export const heroLede = style({
  fontSize: vars.fontSize.base,
  color: vars.color.inkMuted,
  maxWidth: "48ch",
  lineHeight: vars.lineHeight.relaxed,
});

export const heroActions = style({ marginTop: vars.space[4] });

export const definition = style({
  borderInlineStart: `1px solid ${vars.color.sandLine}`,
  paddingInlineStart: vars.space[5],
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.sm,
  lineHeight: vars.lineHeight.relaxed,
  "@media": {
    "screen and (max-width: 56rem)": {
      borderInlineStart: 0,
      borderTop: `1px solid ${vars.color.sandLine}`,
      paddingInlineStart: 0,
      paddingBlockStart: vars.space[4],
    },
  },
});

export const heroWord = style({
  display: "inline-block",
  fontFamily: vars.font.serif,
  color: vars.color.accent,
  fontSize: vars.fontSize.xl2,
  marginBottom: vars.space[2],
});

export const definitionTitle = style({ fontSize: vars.fontSize.md });

export const sourcesNote = style({
  fontSize: vars.fontSize.xs,
  marginTop: vars.space[4],
});

export const textLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space[1],
  paddingBlock: vars.space[2],
  fontSize: vars.fontSize.sm,
  fontWeight: 600,
  color: vars.color.accent,
  textUnderlineOffset: "0.2em",
  selectors: { "&:hover": { color: vars.color.ink } },
});

export const section = style({ paddingBlock: vars.space[7] });
export const sectionAlt = style([
  section,
  { backgroundColor: vars.color.bgAlt },
]);

export const historyGrid = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.7fr)",
  gap: vars.space[8],
  "@media": {
    "screen and (max-width: 56rem)": {
      gridTemplateColumns: "1fr",
      gap: vars.space[4],
    },
  },
});

export const eyebrow = style({
  fontSize: vars.fontSize.xs,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.olive,
  marginBottom: vars.space[2],
});

export const sectionTitle = style({
  fontSize: vars.fontSize.xl2,
  maxWidth: "24ch",
});
export const sectionLede = style({
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.base,
});

export const cardGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: vars.space[8],
  "@media": {
    "screen and (max-width: 56rem)": {
      gridTemplateColumns: "1fr",
      gap: vars.space[5],
    },
  },
});
export const card = style({
  borderTop: `1px solid ${vars.color.sandLine}`,
  paddingBlockStart: vars.space[4],
});
export const cardTitle = style({ fontSize: vars.fontSize.xl });
export const cardBody = style({
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.base,
  maxWidth: "48ch",
});

export const centeredDivider = style({
  display: "block",
  marginInline: "auto",
  marginBlockStart: vars.space[6],
  marginBottom: vars.space[5],
  maxWidth: vars.space[10],
});

export const timelineStrip = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  borderBottom: `1px solid ${vars.color.sandLine}`,
});
export const timelineItem = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "9rem minmax(0, 1fr)",
  alignItems: "baseline",
  gap: vars.space[4],
  paddingBlock: vars.space[3],
  paddingInlineStart: vars.space[3],
  borderTop: `1px solid ${vars.color.sandLine}`,
  textDecoration: "none",
  color: "inherit",
  "@media": {
    "screen and (max-width: 36rem)": {
      gridTemplateColumns: "1fr",
      gap: vars.space[0.5],
    },
  },
});
export const timelineDot = style({
  position: "absolute",
  top: vars.space[4],
  insetInlineStart: 0,
  width: vars.space[0.5],
  height: vars.space[0.5],
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.olive,
});
export const timelineDotCurrent = style([
  timelineDot,
  { backgroundColor: vars.color.accent },
]);
export const timelineYear = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.inkMuted,
  fontVariantNumeric: "tabular-nums",
});
export const timelineLabel = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.md,
  fontWeight: 500,
  transition: "color 0.15s ease",
  selectors: {
    [`${timelineItem}:hover &`]: { color: vars.color.accent },
  },
});
