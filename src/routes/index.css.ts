import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const hero = style({
  paddingBlockStart: vars.space[9],
  paddingBlockEnd: vars.space[7],
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
  fontSize: vars.fontSize.md,
  color: vars.color.inkMuted,
  maxWidth: "52ch",
  lineHeight: vars.lineHeight.relaxed,
});

// A margin note, not a card: a hairline on the inline-start edge and the word itself.
export const definition = style({
  marginBlock: vars.space[6],
  borderInlineStart: `2px solid ${vars.color.accent}`,
  paddingInlineStart: vars.space[4],
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.sm,
  lineHeight: vars.lineHeight.relaxed,
  maxWidth: "52ch",
});

export const heroWord = style({
  display: "block",
  fontFamily: vars.font.serif,
  fontWeight: 600,
  color: vars.color.accent,
  fontSize: vars.fontSize.xl2,
  lineHeight: vars.lineHeight.snug,
});

export const definitionTitle = style({
  fontSize: vars.fontSize.md,
  marginBlock: `${vars.space[1]} ${vars.space[1]}`,
});

export const sourcesNote = style({
  fontSize: vars.fontSize.xs,
  color: vars.color.inkFaint,
  marginBottom: 0,
});

export const heroActions = style({ marginTop: vars.space[5] });

export const inlineLink = style({
  color: vars.color.oliveDark,
  fontWeight: 500,
  textDecorationColor: vars.color.border,
  textUnderlineOffset: "0.2em",
  selectors: {
    "&:hover": {
      color: vars.color.accent,
      textDecorationColor: "currentColor",
    },
  },
});

export const section = style({
  paddingBlock: vars.space[7],
  borderTop: `1px solid ${vars.color.sandLine}`,
});

export const sectionTitle = style({
  fontSize: vars.fontSize.xl2,
  maxWidth: "24ch",
});

export const sectionLede = style({
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.base,
  maxWidth: "52ch",
});

// The homepage is the table of contents: numeral, dates, title, one line.
export const chapterIndex = style({
  listStyle: "none",
  padding: 0,
  margin: `${vars.space[5]} 0 0`,
});

export const chapterLink = style({
  display: "grid",
  gridTemplateColumns: `3rem ${vars.layout.timelineDateColumn} minmax(0, 1fr)`,
  gridTemplateAreas: `"numeral period title" "numeral period summary"`,
  columnGap: vars.space[3],
  alignItems: "baseline",
  paddingBlock: vars.space[3],
  borderTop: `1px solid ${vars.color.sandLine}`,
  textDecoration: "none",
  color: "inherit",
  "@media": {
    "screen and (max-width: 36rem)": {
      gridTemplateColumns: "2.5rem minmax(0, 1fr)",
      gridTemplateAreas: `"numeral period" "numeral title" "numeral summary"`,
    },
  },
});

export const chapterNumeral = style({
  gridArea: "numeral",
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.lg,
  color: vars.color.accent,
  fontVariantNumeric: "lining-nums",
});

export const chapterPeriod = style({
  gridArea: "period",
  fontSize: vars.fontSize.sm,
  color: vars.color.inkMuted,
  fontVariantNumeric: "tabular-nums",
});

export const chapterTitle = style({
  gridArea: "title",
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.lg,
  fontWeight: 600,
  textDecorationLine: "underline",
  textDecorationColor: "transparent",
  textUnderlineOffset: "0.2em",
  transition: "text-decoration-color 0.15s ease",
  selectors: {
    [`${chapterLink}:hover &, ${chapterLink}:focus-visible &`]: {
      textDecorationColor: vars.color.accent,
    },
  },
});

export const chapterSummary = style({
  gridArea: "summary",
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.sm,
  lineHeight: vars.lineHeight.normal,
  marginTop: vars.space[0.5],
});

export const onwardTitle = style({
  fontSize: vars.fontSize.lg,
  marginTop: vars.space[5],
  marginBottom: vars.space[1],
});

export const onwardBody = style({
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.base,
  lineHeight: vars.lineHeight.relaxed,
  maxWidth: "60ch",
});

export const centeredDivider = style({
  display: "block",
  marginInline: "auto",
  marginBlockStart: vars.space[7],
  marginBottom: vars.space[5],
  maxWidth: vars.space[10],
});
