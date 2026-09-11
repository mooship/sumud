import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

/**
 * Composable style for a list entry that can be jumped to directly via a URL
 * anchor (e.g. a cited source, a glossary term). Clears the sticky header on
 * scroll-into-view and highlights the entry while it's the `:target`.
 * Compose into a page's own `entry` style with `style([anchorTarget, {...}])`.
 */
export const anchorTarget = style({
  scrollMarginTop: `calc(${vars.layout.headerHeight} + ${vars.space[3]})`,
  selectors: {
    "&:target": {
      borderLeftColor: vars.color.terracotta,
    },
  },
});
