import { component$, type PropsOf } from "@builder.io/qwik";

export type IconProps = Omit<PropsOf<"svg">, "class"> & {
  class?: string;
  size?: number | string;
};

export const X = component$<IconProps>(({ size = 20, ...props }) => {
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
      <path d="M18 6 6 18" /> <path d="m6 6 12 12" />
    </svg>
  );
});
