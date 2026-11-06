import { style } from "@vanilla-extract/css";
import { vars } from "~/styles/theme.css";

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
