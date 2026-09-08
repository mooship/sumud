import { component$, Slot, type PropsOf } from "@builder.io/qwik";
import clsx from "clsx";
import { container } from "./container.css";

export type ContainerProps = Omit<PropsOf<"div">, "ref"> & {
  width?: "content" | "wide";
  as?: "div" | "section" | "header" | "footer" | "main" | "article";
};

export const Container = component$<ContainerProps>(
  ({ width = "content", as: Tag = "div", class: className, ...props }) => {
    return (
      <Tag class={clsx(container[width], className)} {...props}>
        <Slot />
      </Tag>
    );
  },
);
