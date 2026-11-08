import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { ExternalLink } from "~/components/ui/icons";
import { localizedNavItems, UI_STRINGS } from "~/content/i18n";
import { getLocaleFromPathname, localizedPathname } from "~/lib/locale";
import * as styles from "./footer.css";

export const Footer = component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const strings = UI_STRINGS[locale];
  const navItems = localizedNavItems(locale);
  const sourcesHref = localizedPathname("/sources/", locale);
  const privacyHref = localizedPathname("/privacy/", locale);

  return (
    <footer class={styles.footer}>
      <Container width="wide">
        <div class={styles.grid}>
          <div>
            <h2 class={styles.heading} translate="no">
              Sumud ·{" "}
              <span lang="ar" dir="rtl">
                صمود
              </span>
            </h2>
            <p>{strings.footerTagline}</p>
          </div>

          <div>
            <h2 class={styles.heading}>{strings.footerReadHeading}</h2>
            <ul class={styles.list}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} class={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 class={styles.heading}>{strings.footerProjectHeading}</h2>
            <ul class={styles.list}>
              <li>
                <a
                  href="https://github.com/mooship/sumud"
                  class={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {strings.sourceOnGithub}
                  <ExternalLink size={13} class={styles.externalIcon} />
                  <span class="visually-hidden">{strings.opensNewTab}</span>
                </a>
              </li>
              <li>
                <Link href={sourcesHref} class={styles.link}>
                  {strings.sourcingAndCorrections}
                </Link>
              </li>
              <li>
                <Link href={privacyHref} class={styles.link}>
                  {strings.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
});
