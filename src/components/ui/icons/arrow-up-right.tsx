import { component$, type PropsOf } from "@builder.io/qwik";

export type IconProps = Omit<PropsOf<"svg">, "class"> & {
  class?: string;
  size?: number | string;
};

export const ArrowUpRight = component$<IconProps>(({ size = 20, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M7 7h10v10" /> <path d="M7 17 17 7" />
    </svg>
  );
});
