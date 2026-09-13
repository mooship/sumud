import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { JsonLd } from "~/components/seo/json-ld";
import { Landmark, ScrollText, BookOpen, Quote } from "~/components/ui/icons";
import { BOOK_CATEGORIES } from "~/content/books";
import { getLocaleFromPathname, localizedPathname } from "~/lib/locale";
import * as styles from "./index.css";

const CATEGORY_ICONS = [Landmark, ScrollText, BookOpen, Quote];

const COPY = {
  en: {
    eyebrow: "Further Reading",
    title: "Books about Palestine",
    ledePre:
      "A site can only go so far. These are history, memoir, fiction and poetry that go further, from Palestinian, Israeli and other writers. Several are cited on the ",
    sourcesLink: "sources page",
    ledePost:
      " as works this project draws on directly; others are here for readers who want the story told at greater length, or in a different register.",
    jsonLdName: "Further Reading -- Sumud",
  },
  ar: {
    eyebrow: "قراءات إضافية",
    title: "كتب عن فلسطين",
    ledePre:
      "لا يمكن لموقع أن يفي بكل شيء. هذه كتب تاريخ ومذكرات وأدب روائي وشعر تذهب أبعد من ذلك، بأقلام كتّاب فلسطينيين وإسرائيليين وغيرهم. بعضها مذكور في ",
    sourcesLink: "صفحة المصادر",
    ledePost:
      " بوصفها أعمالًا يعتمد عليها هذا المشروع مباشرة؛ وبعضها الآخر هنا لمن يريد القصة مروية بتفصيل أكبر، أو بأسلوب مختلف.",
    jsonLdName: "قراءات إضافية -- صمود",
  },
};

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = COPY[locale];
  const allBooks = BOOK_CATEGORIES.flatMap((c) => c.books);

  return (
    <Container width="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: copy.jsonLdName,
          itemListElement: allBooks.map((book, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Book",
              name: book.title,
              author: { "@type": "Person", name: book.author },
              datePublished: String(book.year),
              description:
                locale === "ar" ? book.ar.description : book.description,
            },
          })),
        }}
      />
      <header class={styles.header}>
        <p class={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 class={styles.title}>{copy.title}</h1>
        <p class={styles.lede}>
          {copy.ledePre}
          <a href={localizedPathname("/sources/", locale)}>
            {copy.sourcesLink}
          </a>
          {copy.ledePost}
        </p>
      </header>

      {BOOK_CATEGORIES.map((category, i) => {
        const CategoryIcon = CATEGORY_ICONS[i % CATEGORY_ICONS.length];
        return (
          <section key={category.title} class={styles.category}>
            <div class={styles.categoryTitleRow}>
              <span class={styles.categoryIconBadge}>
                <CategoryIcon size={20} />
              </span>
              <h2 class={styles.categoryTitle}>
                {locale === "ar" ? category.ar.title : category.title}
              </h2>
            </div>
            <p class={styles.categoryIntro}>
              {locale === "ar" ? category.ar.intro : category.intro}
            </p>
            <div class={styles.list}>
              {category.books.map((book) => (
                <div key={book.title} class={styles.book}>
                  <p class={styles.bookTitle}>
                    {book.title}
                    <span class={styles.bookMeta}>
                      {" "}
                      -- {book.author}, {book.year}
                    </span>
                  </p>
                  <p class={styles.bookDescription}>
                    {locale === "ar" ? book.ar.description : book.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </Container>
  );
});

export const head: DocumentHead = ({ url }) => {
  const locale = getLocaleFromPathname(url.pathname);
  return locale === "ar"
    ? {
        title: "قراءات إضافية",
        meta: [
          {
            name: "description",
            content:
              "كتب تاريخ ومذكرات وأدب روائي وشعر موصى بها عن فلسطين، بأقلام كتّاب فلسطينيين وإسرائيليين وغيرهم.",
          },
        ],
      }
    : {
        title: "Further Reading",
        meta: [
          {
            name: "description",
            content:
              "Recommended history, memoir, fiction and poetry about Palestine, from Palestinian, Israeli and other writers.",
          },
        ],
      };
};
