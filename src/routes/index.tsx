import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { ButtonLink } from "~/components/ui/button-link";
import { PullQuote } from "~/components/ui/pull-quote";
import { OrnamentDivider } from "~/components/ui/ornament-divider";
import {
  ArrowRight,
  ScrollText,
  Users,
  HeartHandshake,
} from "~/components/ui/icons";
import { HISTORY_CHAPTERS } from "~/content/history-chapters";
import { JsonLd } from "~/components/seo/json-ld";
import * as styles from "./index.css";

export default component$(() => {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Sumud",
          url: "https://sumud.timothybrits.co.za",
          description:
            "The story of Palestine and its people, before 1947 and after: history, culture, and steadfastness.",
          inLanguage: "en-GB",
        }}
      />
      <section class={styles.hero}>
        <svg
          class={styles.heroMark}
          viewBox="0 0 32 32"
          role="presentation"
          aria-hidden="true"
        >
          <path
            d="M16 27c-1-6.5 1.5-11.5 6-15"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          />
          <ellipse
            cx="19.5"
            cy="9.5"
            rx="3.6"
            ry="2"
            transform="rotate(-40 19.5 9.5)"
            fill="currentColor"
          />
          <ellipse
            cx="15.2"
            cy="14.6"
            rx="3.8"
            ry="2.1"
            transform="rotate(-35 15.2 14.6)"
            fill="currentColor"
          />
          <ellipse
            cx="12"
            cy="20.4"
            rx="3.6"
            ry="2"
            transform="rotate(-25 12 20.4)"
            fill="currentColor"
          />
          <circle cx="16" cy="27.4" r="1.6" fill="currentColor" />
        </svg>
        <Container width="wide">
          <span class={styles.heroWord} lang="ar" dir="rtl">
            صمود
          </span>
          <h1 class={styles.heroTitle}>Sumud</h1>
          <p class={styles.heroLede}>
            The story of Palestine and its people, before 1947 and after: a
            history of a land, a people driven from most of it, and the
            steadfastness that has kept their story alive.
          </p>
          <div class={styles.heroActions}>
            <ButtonLink href="/history/" variant="primary">
              Start with the history
              <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href="/culture/" variant="secondary">
              Explore Sumud & culture
            </ButtonLink>
          </div>
        </Container>
        <OrnamentDivider tone="olive" class={styles.heroDivider} />
      </section>

      <section class={styles.section}>
        <Container width="wide">
          <p class={styles.eyebrow}>Why this site exists</p>
          <h2 class={styles.sectionTitle}>A people's history, told plainly</h2>
          <p class={styles.sectionLede}>
            Palestine rarely gets told as a continuous story. It is more often
            reduced to a single week's news, stripped of the centuries that came
            before it and the people who have lived through all of it. This
            project tries to put that back together: the Ottoman province, the
            Mandate, the Nakba, the decades of exile and occupation, and the
            Palestine of today -- alongside the culture, language and everyday
            resilience that have carried people through it.
          </p>
          <p class={styles.sectionLede}>
            It draws on mainstream historical scholarship and the documented
            record of United Nations bodies and human rights organisations.
            Where facts are disputed, we say so. See the{" "}
            <a href="/sources/">sources page</a> for the full picture and how to
            flag a correction.
          </p>
        </Container>
      </section>

      <section class={styles.sectionAlt}>
        <Container width="content">
          <p class={styles.eyebrow}>The history, in brief</p>
          <h2 class={styles.sectionTitle}>Seven chapters, one thread</h2>
          <div class={styles.timelineStrip}>
            {HISTORY_CHAPTERS.map((chapter) => (
              <a
                key={chapter.slug}
                href={`/history/${chapter.slug}/`}
                class={styles.timelineItem}
              >
                <span
                  class={
                    chapter.current
                      ? styles.timelineDotCurrent
                      : styles.timelineDot
                  }
                />
                <span class={styles.timelineYear}>{chapter.period}</span>
                <span class={styles.timelineLabel}>{chapter.title}</span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section class={styles.section}>
        <Container width="wide">
          <div class={styles.cardGrid}>
            <a href="/history/" class={styles.card}>
              <span class={styles.cardIconBadge}>
                <ScrollText size={22} />
              </span>
              <h3 class={styles.cardTitle}>History</h3>
              <p class={styles.cardBody}>
                From Ottoman Palestine to the present day: seven chapters
                covering partition, the Nakba, occupation and the decades since.
              </p>
              <span class={styles.cardLink}>
                Read the history <ArrowRight size={14} />
              </span>
            </a>

            <a href="/culture/" class={styles.card}>
              <span class={styles.cardIconBadge}>
                <Users size={22} />
              </span>
              <h3 class={styles.cardTitle}>Culture & Sumud</h3>
              <p class={styles.cardBody}>
                Olive groves, embroidery, poetry and cuisine -- and the idea of
                sumud itself, steadfastness as a way of holding on to a place
                and a story.
              </p>
              <span class={styles.cardLink}>
                Explore the culture <ArrowRight size={14} />
              </span>
            </a>

            <a href="/take-action/" class={styles.card}>
              <span class={styles.cardIconBadge}>
                <HeartHandshake size={22} />
              </span>
              <h3 class={styles.cardTitle}>Take Action</h3>
              <p class={styles.cardBody}>
                Reputable humanitarian and human rights organisations working on
                the ground, for anyone who wants to do more than read.
              </p>
              <span class={styles.cardLink}>
                See how to help <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </Container>
      </section>

      <section class={styles.section}>
        <Container width="content">
          <OrnamentDivider tone="sand" class={styles.centeredDivider} />
          <PullQuote
            quote="We have on this land that which makes life worth living."
            cite="Mahmoud Darwish, 'On This Land'"
          />
        </Container>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Sumud -- the story of Palestine",
  meta: [
    {
      name: "description",
      content:
        "Sumud tells the story of Palestine and its people, before 1947 and after: history, culture, and steadfastness.",
    },
  ],
};
