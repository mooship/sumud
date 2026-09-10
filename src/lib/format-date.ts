/**
 * Formats an ISO date (YYYY-MM-DD) as a British long date, e.g. "10 September 2026".
 */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
