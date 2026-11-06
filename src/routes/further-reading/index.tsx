import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { JsonLd } from "~/components/seo/json-ld";
import { Landmark, ScrollText, BookOpen, Quote } from "~/components/ui/icons";
import { BOOK_CATEGORIES } from "~/content/books";
import { localizedHead } from "~/content/i18n";
import { getLocaleFromPathname, localizedPathname } from "~/lib/locale";
import * as styles from "./index.css";

const CATEGORY_ICONS = [Landmark, ScrollText, BookOpen, Quote];

const COPY = {
  en: {
    eyebrow: "Further Reading",
    title: "Books about Palestine",
    ledePre:
      "History, memoir, fiction and poetry by Palestinian, Israeli and other writers. Books used in the history chapters also appear on the ",
    sourcesLink: "sources page",
    ledePost:
      ". The rest offer other ways into the subject, through personal accounts, novels and poems.",
    jsonLdName: "Further Reading · Sumud",
    headTitle: "Further Reading",
    headDescription:
      "Recommended history, memoir, fiction and poetry about Palestine, from Palestinian, Israeli and other writers.",
  },
  ar: {
    eyebrow: "قراءات إضافية",
    title: "كتب عن فلسطين",
    ledePre:
      "كتب تاريخ ومذكرات وروايات وشعر بأقلام كتّاب فلسطينيين وإسرائيليين وغيرهم. وتظهر الكتب المستخدمة في فصول التاريخ أيضًا في ",
    sourcesLink: "صفحة المصادر",
    ledePost:
      ". أما بقية الكتب فتقدم مداخل أخرى إلى الموضوع، عبر الشهادات الشخصية والروايات والقصائد.",
    jsonLdName: "قراءات إضافية -- صمود",
    headTitle: "قراءات إضافية",
    headDescription:
      "كتب تاريخ ومذكرات وأدب روائي وشعر موصى بها عن فلسطين، بأقلام كتّاب فلسطينيين وإسرائيليين وغيرهم.",
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
                      {book.author}, {book.year}
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

export const head: DocumentHead = ({ url }) =>
  localizedHead(getLocaleFromPathname(url.pathname), COPY);
