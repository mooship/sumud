import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { JsonLd } from "~/components/seo/json-ld";
import { Container } from "~/components/ui/container";
import { PageHeader } from "~/components/ui/page-header";
import { BOOK_CATEGORIES } from "~/content/books";
import { localizedHead } from "~/content/i18n";
import { getLocaleFromPathname, localizedPathname } from "~/lib/locale";
import * as styles from "./index.css";

const COPY = {
  en: {
    title: "Books about Palestine",
    ledePre:
      "History, memoir, fiction and poetry by Palestinian, Israeli and other writers. Books used in the history chapters also appear on the ",
    sourcesLink: "sources page",
    ledePost:
      ". The rest offer other ways into the subject, through personal accounts, novels and poems.",
    jsonLdName: "Further reading · Sumud",
    headTitle: "Further reading",
    headDescription:
      "Recommended history, memoir, fiction and poetry about Palestine, from Palestinian, Israeli and other writers.",
  },
  ar: {
    title: "كتب عن فلسطين",
    ledePre:
      "كتب تاريخ ومذكرات وروايات وشعر بأقلام كتّاب فلسطينيين وإسرائيليين وغيرهم. وتظهر الكتب المستخدمة في فصول التاريخ أيضًا في ",
    sourcesLink: "صفحة المصادر",
    ledePost:
      ". أما بقية الكتب فتقدم مداخل أخرى إلى الموضوع، عبر الشهادات الشخصية والروايات والقصائد.",
    jsonLdName: "قراءات إضافية · صمود",
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
      <PageHeader title={copy.title}>
        <p>
          {copy.ledePre}
          <a href={localizedPathname("/sources/", locale)}>
            {copy.sourcesLink}
          </a>
          {copy.ledePost}
        </p>
      </PageHeader>

      {BOOK_CATEGORIES.map((category) => {
        return (
          <section key={category.title} class={styles.category}>
            <h2 class={styles.categoryTitle}>
              {locale === "ar" ? category.ar.title : category.title}
            </h2>
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
