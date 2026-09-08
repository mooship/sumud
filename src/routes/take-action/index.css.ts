import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const header = style({
  paddingBlockStart: vars.space[7],
  paddingBlockEnd: vars.space[5],
});

export const eyebrow = style({
  fontSize: vars.fontSize.xs,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: vars.color.oliveDark,
  marginBottom: vars.space[2],
});

export const title = style({
  fontSize: vars.fontSize.xl3,
  maxWidth: "20ch",
});

export const lede = style({
  maxWidth: "62ch",
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.md,
  lineHeight: vars.lineHeight.relaxed,
});

export const group = style({
  paddingBlock: vars.space[6],
  borderTop: `1px solid ${vars.color.sandLine}`,
});

export const groupTitleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space[2],
  marginBottom: vars.space[1],
});

export const groupIconBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.5rem",
  height: "2.5rem",
  flexShrink: 0,
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.terracottaLight,
  color: vars.color.terracotta,
});

export const groupTitle = style({
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.lg,
  margin: 0,
});

export const groupIntro = style({
  color: vars.color.inkMuted,
  fontSize: vars.fontSize.sm,
  marginBottom: vars.space[4],
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: vars.space[3],
  "@media": {
    "screen and (max-width: 40rem)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const card = style({
  display: "block",
  padding: vars.space[3],
  border: `1px solid ${vars.color.sandLine}`,
  borderRadius: vars.radius.md,
  textDecoration: "none",
  color: "inherit",
  transition: "border-color 0.15s ease",
  selectors: {
    "&:hover": { borderColor: vars.color.olive },
  },
});

export const cardName = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space[1],
  fontWeight: 600,
  color: vars.color.ink,
  marginBottom: "0.3em",
});

export const cardIcon = style({
  color: vars.color.inkFaint,
});

export const cardDescription = style({
  fontSize: vars.fontSize.sm,
  color: vars.color.inkMuted,
  margin: 0,
});
