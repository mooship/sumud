import { component$, Slot, type PropsOf } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import clsx from "clsx";
import { variant as buttonVariant } from "./button-link.css";

export type ButtonLinkProps = PropsOf<typeof Link> & {
  variant?: "primary" | "secondary";
};

export const ButtonLink = component$<ButtonLinkProps>(
  ({ variant = "primary", class: className, ...props }) => {
    return (
      <Link class={clsx(buttonVariant[variant], className)} {...props}>
        <Slot />
      </Link>
    );
  },
);
