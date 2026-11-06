import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { JsonLd } from "~/components/seo/json-ld";
import { ExternalLink } from "~/components/ui/icons";
import { ORG_GROUPS } from "~/content/organisations";
import { UI_STRINGS, localizedHead } from "~/content/i18n";
import { getLocaleFromPathname } from "~/lib/locale";
import * as styles from "./index.css";

const COPY = {
  en: {
    eyebrow: "Take Action",
    title: "Aid and human rights organisations",
    lede: "These organisations provide humanitarian aid or document human rights abuses in Gaza, the West Bank and refugee communities. Follow the links to read about their current work and ways to support it. Inclusion here is not an endorsement of every position an organisation takes.",
    jsonLdName: "Take Action · Sumud",
    headTitle: "Take Action",
    headDescription:
      "Reputable humanitarian and human rights organisations working in Gaza, the West Bank and with Palestinian refugees.",
  },
  ar: {
    eyebrow: "بادر بالفعل",
    title: "منظمات الإغاثة وحقوق الإنسان",
    lede: "تقدم هذه المنظمات مساعدات إنسانية أو توثق انتهاكات حقوق الإنسان في غزة والضفة الغربية وتجمعات اللاجئين. اتبع الروابط للاطلاع على عملها الحالي وطرق دعمه. إدراج منظمة هنا لا يعني تأييد كل موقف تتخذه.",
    jsonLdName: "بادر بالفعل · صمود",
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

      {ORG_GROUPS.map((group) => (
        <section key={group.title} class={styles.group}>
          <h2 class={styles.groupTitle}>
            {locale === "ar" ? group.ar.title : group.title}
          </h2>
          <p class={styles.groupIntro}>
            {locale === "ar" ? group.ar.intro : group.intro}
          </p>
          <ul class={styles.list}>
            {group.orgs.map((org) => (
              <li key={org.name} class={styles.item}>
                <a
                  href={org.url}
                  class={styles.orgLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {org.name}
                  <ExternalLink size={13} class={styles.orgIcon} />
                  <span class="visually-hidden">{strings.opensNewTab}</span>
                </a>
                <p class={styles.orgDescription}>
                  {locale === "ar" ? org.ar.description : org.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Container>
  );
});

export const head: DocumentHead = ({ url }) =>
  localizedHead(getLocaleFromPathname(url.pathname), COPY);
