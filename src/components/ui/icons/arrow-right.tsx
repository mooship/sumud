import { component$, type PropsOf } from "@builder.io/qwik";

export type IconProps = Omit<PropsOf<"svg">, "class"> & {
  class?: string;
  size?: number | string;
};

export const ArrowRight = component$<IconProps>(({ size = 20, ...props }) => {
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
      <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" />
    </svg>
  );
});
