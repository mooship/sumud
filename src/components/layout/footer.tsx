import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { ExternalLink } from "~/components/ui/icons";
import { NAV_ITEMS } from "~/content/nav";
import * as styles from "./footer.css";

export const Footer = component$(() => {
  const year = new Date().getFullYear();

  return (
    <footer class={styles.footer}>
      <Container width="wide">
        <div class={styles.grid}>
          <div>
            <p class={styles.heading}>Sumud · صمود</p>
            <p>
              An independent, non-commercial project telling the story of
              Palestine and its people -- before 1947 and after. Sumud means
              steadfastness: staying rooted in the land and the story, whatever
              comes.
            </p>
          </div>

          <div>
            <p class={styles.heading}>Read</p>
            <ul class={styles.list}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} class={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p class={styles.heading}>Project</p>
            <ul class={styles.list}>
              <li>
                <a
                  href="https://github.com/mooship/sumud"
                  class={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source on GitHub
                  <ExternalLink size={13} class={styles.externalIcon} />
                </a>
              </li>
              <li>
                <Link href="/sources/" class={styles.link}>
                  Sourcing & corrections
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div class={styles.bottom}>
          <p>
            © {year} Sumud. Historical content is offered for education under
            fair use.
          </p>
          <p>Built with Qwik, hosted on Cloudflare.</p>
        </div>
      </Container>
    </footer>
  );
});
