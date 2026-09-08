import { component$, useSignal } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Menu, X } from "~/components/ui/icons";
import { Container } from "~/components/ui/container";
import { NAV_ITEMS } from "~/content/nav";
import * as styles from "./header.css";

export const Header = component$(() => {
  const loc = useLocation();
  const open = useSignal(false);
  const pathname = loc.url.pathname;

  return (
    <>
      <a href="#main-content" class={styles.skipLink}>
        Skip to content
      </a>
      <header class={styles.header}>
        <Container width="wide">
          <div class={styles.bar}>
            <Link href="/" class={styles.brand}>
              <span class={styles.brandMark}>سمود</span>
              <span>Sumud</span>
            </Link>

            <nav class={styles.nav} aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  class={styles.navLink}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              class={styles.menuButton}
              aria-expanded={open.value}
              aria-controls="mobile-nav"
              aria-label={open.value ? "Close menu" : "Open menu"}
              onClick$={() => (open.value = !open.value)}
            >
              {open.value ? <X /> : <Menu />}
            </button>
          </div>

          <nav
            id="mobile-nav"
            class={styles.mobileNav}
            data-open={open.value}
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                class={styles.mobileNavLink}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick$={() => (open.value = false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </header>
    </>
  );
});
