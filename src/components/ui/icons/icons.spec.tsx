import { describe, expect, it } from "vitest";
import { createDOM } from "@builder.io/qwik/testing";
import { ArrowRight } from "./arrow-right";
import { ArrowUpRight } from "./arrow-up-right";
import { BookOpen } from "./book-open";
import { ChevronDown } from "./chevron-down";
import { ExternalLink } from "./external-link";
import { Flag } from "./flag";
import { HeartHandshake } from "./heart-handshake";
import { Landmark } from "./landmark";
import { Map } from "./map";
import { Menu } from "./menu";
import { Quote } from "./quote";
import { ScrollText } from "./scroll-text";
import { ShieldAlert } from "./shield-alert";
import { Users } from "./users";

const ICONS = [
  ["ArrowRight", ArrowRight],
  ["ArrowUpRight", ArrowUpRight],
  ["BookOpen", BookOpen],
  ["ChevronDown", ChevronDown],
  ["ExternalLink", ExternalLink],
  ["Flag", Flag],
  ["HeartHandshake", HeartHandshake],
  ["Landmark", Landmark],
  ["Map", Map],
  ["Menu", Menu],
  ["Quote", Quote],
  ["ScrollText", ScrollText],
  ["ShieldAlert", ShieldAlert],
  ["Users", Users],
] as const;

describe.each(ICONS)("%s icon", (_name, Icon) => {
  it("renders an accessible, decorative svg at the default size", async () => {
    const { screen, render } = await createDOM();
    await render(<Icon />);
    const svg = screen.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("20");
    expect(svg?.getAttribute("height")).toBe("20");
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });

  it("honours a custom size and passes through extra props", async () => {
    const { screen, render } = await createDOM();
    await render(<Icon size={32} data-testid="icon" />);
    const svg = screen.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("32");
    expect(svg?.getAttribute("height")).toBe("32");
    expect(svg?.getAttribute("data-testid")).toBe("icon");
  });
});
