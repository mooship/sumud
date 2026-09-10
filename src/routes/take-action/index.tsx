import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { JsonLd } from "~/components/seo/json-ld";
import {
  ExternalLink,
  HeartHandshake,
  ShieldAlert,
} from "~/components/ui/icons";
import { ORG_GROUPS } from "~/content/organisations";
import * as styles from "./index.css";

const GROUP_ICONS = [HeartHandshake, ShieldAlert];

export default component$(() => {
  const allOrgs = ORG_GROUPS.flatMap((g) => g.orgs);

  return (
    <Container width="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Take Action -- Sumud",
          itemListElement: allOrgs.map((org, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Organization",
              name: org.name,
              url: org.url,
              description: org.description,
            },
          })),
        }}
      />
      <header class={styles.header}>
        <p class={styles.eyebrow}>Take Action</p>
        <h1 class={styles.title}>Beyond reading</h1>
        <p class={styles.lede}>
          These are established humanitarian and human rights organisations
          working on the ground in Gaza, the West Bank and with Palestinian
          refugees across the region. Some are Palestinian, some Israeli, some
          international -- listed here because their work is documented and
          their reporting is widely used by journalists and researchers, not as
          an endorsement of every position any of them takes.
        </p>
      </header>

      {ORG_GROUPS.map((group, i) => {
        const GroupIcon = GROUP_ICONS[i % GROUP_ICONS.length];
        return (
          <section key={group.title} class={styles.group}>
            <div class={styles.groupTitleRow}>
              <span class={styles.groupIconBadge}>
                <GroupIcon size={20} />
              </span>
              <h2 class={styles.groupTitle}>{group.title}</h2>
            </div>
            <p class={styles.groupIntro}>{group.intro}</p>
            <div class={styles.grid}>
              {group.orgs.map((org) => (
                <a
                  key={org.name}
                  href={org.url}
                  class={styles.card}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p class={styles.cardName}>
                    {org.name}
                    <ExternalLink size={14} class={styles.cardIcon} />
                    <span class="visually-hidden"> (opens in a new tab)</span>
                  </p>
                  <p class={styles.cardDescription}>{org.description}</p>
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </Container>
  );
});

export const head: DocumentHead = {
  title: "Take Action",
  meta: [
    {
      name: "description",
      content:
        "Reputable humanitarian and human rights organisations working in Gaza, the West Bank and with Palestinian refugees.",
    },
  ],
};
