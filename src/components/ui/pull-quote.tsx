import { component$ } from "@builder.io/qwik";
import { Quote } from "~/components/ui/icons";
import * as styles from "./pull-quote.css";

export interface PullQuoteProps {
  quote: string;
  cite: string;
}

export const PullQuote = component$<PullQuoteProps>(({ quote, cite }) => {
  return (
    <figure class={styles.figure}>
      <Quote size={22} class={styles.mark} />
      <blockquote class={styles.quote}>
        <p>{quote}</p>
      </blockquote>
      <figcaption class={styles.cite}>{cite}</figcaption>
    </figure>
  );
});
