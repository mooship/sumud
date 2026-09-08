import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

export const prose = style({
  fontSize: vars.fontSize.md,
  lineHeight: vars.lineHeight.relaxed,
  color: vars.color.ink,
});

globalStyle(`${prose} > * + *`, {
  marginTop: vars.space[3],
});

globalStyle(`${prose} h2`, {
  fontSize: vars.fontSize.xl,
  marginTop: vars.space[7],
});

globalStyle(`${prose} h3`, {
  fontSize: vars.fontSize.lg,
  marginTop: vars.space[5],
});

globalStyle(`${prose} p, ${prose} ul, ${prose} ol`, {
  maxWidth: "68ch",
  textWrap: "pretty",
});

globalStyle(`${prose} a`, {
  color: vars.color.oliveDark,
  textDecorationColor: vars.color.sandLine,
  textUnderlineOffset: "0.2em",
});

globalStyle(`${prose} a:hover`, {
  color: vars.color.terracotta,
  textDecorationColor: "currentColor",
});

globalStyle(`${prose} strong`, {
  fontWeight: 600,
});

globalStyle(`${prose} blockquote`, {
  fontFamily: vars.font.serif,
  fontSize: vars.fontSize.lg,
  fontStyle: "italic",
  lineHeight: vars.lineHeight.snug,
  color: vars.color.oliveDark,
  borderLeft: `3px solid ${vars.color.olive}`,
  margin: `${vars.space[6]} 0`,
  padding: `${vars.space[1]} 0 ${vars.space[1]} ${vars.space[4]}`,
});

globalStyle(`${prose} blockquote p`, {
  margin: 0,
});

globalStyle(`${prose} figure`, {
  margin: `${vars.space[5]} 0`,
});

globalStyle(`${prose} figcaption`, {
  fontFamily: vars.font.sans,
  fontSize: vars.fontSize.xs,
  color: vars.color.inkFaint,
  marginTop: vars.space[1],
});

globalStyle(`${prose} hr`, {
  border: "none",
  borderTop: `1px solid ${vars.color.sandLine}`,
  margin: `${vars.space[7]} 0`,
});

globalStyle(`${prose} code`, {
  fontSize: "0.9em",
  backgroundColor: vars.color.bgAlt,
  padding: "0.15em 0.4em",
  borderRadius: vars.radius.sm,
});
