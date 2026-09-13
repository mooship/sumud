import { component$, useSignal } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Menu, X } from "~/components/ui/icons";
import { Container } from "~/components/ui/container";
import { UI_STRINGS, localizedNavItems } from "~/content/i18n";
import { getLocaleFromPathname } from "~/lib/locale";
import { LanguageBanner } from "./language-banner";
import { LanguageSwitcher } from "./language-switcher";
import * as styles from "./header.css";

export const Header = component$(() => {
  const loc = useLocation();
  const open = useSignal(false);
  const pathname = loc.url.pathname;
  const locale = getLocaleFromPathname(pathname);
  const strings = UI_STRINGS[locale];
  const navItems = localizedNavItems(locale);
  const homeHref = locale === "ar" ? "/ar/" : "/";

  return (
    <>
      <LanguageBanner />
      <a href="#main-content" class={styles.skipLink}>
        {strings.skipToContent}
      </a>
      <header class={styles.header}>
        <Container width="wide">
          <div class={styles.bar}>
            <Link href={homeHref} class={styles.brand}>
              <span class={styles.brandMark}>سمود</span>
              <span>Sumud</span>
            </Link>

            <nav class={styles.nav} aria-label={strings.primaryNav}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  class={styles.navLink}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              <LanguageSwitcher />
            </nav>

            <button
              type="button"
              class={styles.menuButton}
              aria-expanded={open.value}
              aria-controls="mobile-nav"
              aria-label={open.value ? strings.closeMenu : strings.openMenu}
              onClick$={() => (open.value = !open.value)}
            >
              {open.value ? <X /> : <Menu />}
            </button>
          </div>

          <nav
            id="mobile-nav"
            class={styles.mobileNav}
            data-open={open.value ? "true" : "false"}
            aria-label={strings.primaryNav}
          >
            {navItems.map((item) => (
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
            <LanguageSwitcher />
          </nav>
        </Container>
      </header>
    </>
  );
});
