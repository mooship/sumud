import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Container } from "~/components/ui/container";
import { JsonLd } from "~/components/seo/json-ld";
import { Landmark, ScrollText, BookOpen, Quote } from "~/components/ui/icons";
import { BOOK_CATEGORIES } from "~/content/books";
import * as styles from "./index.css";

const CATEGORY_ICONS = [Landmark, ScrollText, BookOpen, Quote];

export default component$(() => {
  const allBooks = BOOK_CATEGORIES.flatMap((c) => c.books);

  return (
    <Container width="content">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Further Reading -- Sumud",
          itemListElement: allBooks.map((book, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Book",
              name: book.title,
              author: { "@type": "Person", name: book.author },
              datePublished: String(book.year),
              description: book.description,
            },
          })),
        }}
      />
      <header class={styles.header}>
        <p class={styles.eyebrow}>Further Reading</p>
        <h1 class={styles.title}>Books about Palestine</h1>
        <p class={styles.lede}>
          A site can only go so far. These are history, memoir, fiction and
          poetry that go further, from Palestinian, Israeli and other writers.
          Several are cited on the <a href="/sources/">sources page</a> as works
          this project draws on directly; others are here for readers who want
          the story told at greater length, or in a different register.
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
              <h2 class={styles.categoryTitle}>{category.title}</h2>
            </div>
            <p class={styles.categoryIntro}>{category.intro}</p>
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
                  <p class={styles.bookDescription}>{book.description}</p>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </Container>
  );
});

export const head: DocumentHead = {
  title: "Further Reading",
  meta: [
    {
      name: "description",
      content:
        "Recommended history, memoir, fiction and poetry about Palestine, from Palestinian, Israeli and other writers.",
    },
  ],
};
