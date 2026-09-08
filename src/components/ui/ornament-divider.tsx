import { component$ } from "@builder.io/qwik";
import clsx from "clsx";
import { divider, oliveTone } from "./ornament-divider.css";

export interface OrnamentDividerProps {
  tone?: "sand" | "olive";
  class?: string;
}

/**
 * A repeating diamond motif, in the spirit of Palestinian tatreez
 * cross-stitch patterns, used as a section divider instead of a plain rule.
 */
export const OrnamentDivider = component$<OrnamentDividerProps>(
  ({ tone = "sand", class: className }) => {
    const patternId = `tatreez-${tone}`;
    return (
      <svg
        class={clsx(divider, tone === "olive" && oliveTone, className)}
        viewBox="0 0 160 14"
        preserveAspectRatio="xMidYMid meet"
        role="presentation"
        aria-hidden="true"
      >
        <pattern
          id={patternId}
          width="20"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M10 2 L16 7 L10 12 L4 7 Z"
            fill="none"
            stroke="currentColor"
            stroke-width="1.25"
          />
          <circle cx="10" cy="7" r="1" fill="currentColor" />
        </pattern>
        <rect width="160" height="14" fill={`url(#${patternId})`} />
      </svg>
    );
  },
);
