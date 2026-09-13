import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { JsonLd } from "~/components/seo/json-ld";
import {
  ExternalLink,
  HeartHandshake,
  ShieldAlert,
} from "~/components/ui/icons";
import { ORG_GROUPS } from "~/content/organisations";
import { UI_STRINGS, localizedHead } from "~/content/i18n";
import { getLocaleFromPathname } from "~/lib/locale";
import * as styles from "./index.css";

const GROUP_ICONS = [HeartHandshake, ShieldAlert];

const COPY = {
  en: {
    eyebrow: "Take Action",
    title: "Beyond reading",
    lede: "These are established humanitarian and human rights organisations working on the ground in Gaza, the West Bank and with Palestinian refugees across the region. Some are Palestinian, some Israeli, some international -- listed here because their work is documented and their reporting is widely used by journalists and researchers, not as an endorsement of every position any of them takes.",
    jsonLdName: "Take Action -- Sumud",
    headTitle: "Take Action",
    headDescription:
      "Reputable humanitarian and human rights organisations working in Gaza, the West Bank and with Palestinian refugees.",
  },
  ar: {
    eyebrow: "بادر بالفعل",
    title: "أبعد من القراءة",
    lede: "هذه منظمات إنسانية وحقوقية راسخة تعمل ميدانيًا في غزة والضفة الغربية ومع اللاجئين الفلسطينيين في أنحاء المنطقة. بعضها فلسطيني، وبعضها إسرائيلي، وبعضها دولي -- وأُدرجت هنا لأن عملها موثق وتقاريرها مستخدمة على نطاق واسع من قبل الصحفيين والباحثين، لا تأييدًا لكل موقف تتخذه أي منها.",
    jsonLdName: "بادر بالفعل -- صمود",
    headTitle: "بادر بالفعل",
    headDescription:
      "منظمات إنسانية وحقوقية موثوقة تعمل في غزة والضفة الغربية ومع اللاجئين الفلسطينيين.",
  },
};

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = COPY[locale];
  const strings = UI_STRINGS[locale];
  const allOrgs = ORG_GROUPS.flatMap((g) => g.orgs);

  return (
    <Container width="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: copy.jsonLdName,
          itemListElement: allOrgs.map((org, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Organization",
              name: org.name,
              url: org.url,
              description:
                locale === "ar" ? org.ar.description : org.description,
            },
          })),
        }}
      />
      <header class={styles.header}>
        <p class={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 class={styles.title}>{copy.title}</h1>
        <p class={styles.lede}>{copy.lede}</p>
      </header>

      {ORG_GROUPS.map((group, i) => {
        const GroupIcon = GROUP_ICONS[i % GROUP_ICONS.length];
        return (
          <section key={group.title} class={styles.group}>
            <div class={styles.groupTitleRow}>
              <span class={styles.groupIconBadge}>
                <GroupIcon size={20} />
              </span>
              <h2 class={styles.groupTitle}>
                {locale === "ar" ? group.ar.title : group.title}
              </h2>
            </div>
            <p class={styles.groupIntro}>
              {locale === "ar" ? group.ar.intro : group.intro}
            </p>
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
                    <span class="visually-hidden">{strings.opensNewTab}</span>
                  </p>
                  <p class={styles.cardDescription}>
                    {locale === "ar" ? org.ar.description : org.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </Container>
  );
});

export const head: DocumentHead = ({ url }) =>
  localizedHead(getLocaleFromPathname(url.pathname), COPY);
