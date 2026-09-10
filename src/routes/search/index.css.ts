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

// Pagefind ships its own UI stylesheet (self-hosted, loaded at runtime from
// /pagefind/pagefind-ui.css). These custom properties are the hooks it
// exposes for theming -- mapping them onto our own tokens keeps the search
// widget visually consistent (and correct in dark mode, since vars.color.*
// already swap under prefers-color-scheme) without touching Pagefind's CSS.
export const mount = style({
  paddingBlockEnd: vars.space[8],
  vars: {
    "--pagefind-ui-primary": vars.color.oliveDark,
    "--pagefind-ui-text": vars.color.ink,
    "--pagefind-ui-background": "transparent",
    "--pagefind-ui-border": vars.color.sandLine,
    "--pagefind-ui-border-radius": vars.radius.md,
    "--pagefind-ui-font": vars.font.sans,
  },
});
