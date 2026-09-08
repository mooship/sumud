import { component$, Slot } from "@builder.io/qwik";
import clsx from "clsx";
import { prose } from "./prose.css";

export interface ProseProps {
  class?: string;
}

export const Prose = component$<ProseProps>(({ class: className }) => {
  return (
    <div class={clsx(prose, className)}>
      <Slot />
    </div>
  );
});
