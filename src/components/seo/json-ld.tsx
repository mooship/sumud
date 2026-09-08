import { component$ } from "@builder.io/qwik";

export interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Renders a JSON-LD <script> tag. Search engines parse it anywhere in the document, so it's
 *  rendered directly in the page body rather than threaded through DocumentHead. */
export const JsonLd = component$<JsonLdProps>(({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={JSON.stringify(data)}
    />
  );
});
