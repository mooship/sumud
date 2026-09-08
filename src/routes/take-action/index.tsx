import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { ExternalLink } from "~/components/ui/icons";
import { ORG_GROUPS } from "~/content/organisations";
import * as styles from "./index.css";

export default component$(() => {
  return (
    <Container width="content">
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

      {ORG_GROUPS.map((group) => (
        <section key={group.title} class={styles.group}>
          <h2 class={styles.groupTitle}>{group.title}</h2>
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
                </p>
                <p class={styles.cardDescription}>{org.description}</p>
              </a>
            ))}
          </div>
        </section>
      ))}
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
