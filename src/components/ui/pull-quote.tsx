import { component$ } from "@builder.io/qwik";
import * as styles from "./pull-quote.css";

export interface PullQuoteProps {
  quote: string;
  cite: string;
}

export const PullQuote = component$<PullQuoteProps>(({ quote, cite }) => {
  return (
    <figure class={styles.figure}>
      <blockquote class={styles.quote}>
        <p>{quote}</p>
      </blockquote>
      <figcaption class={styles.cite}>{cite}</figcaption>
    </figure>
  );
});
