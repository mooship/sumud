/** Parses an ISO date (YYYY-MM-DD) as UTC midnight, rather than the local timezone
 *  `new Date(iso)` would otherwise use for a bare date string. */
export function parseIsoDateUTC(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

/**
 * Formats an ISO date (YYYY-MM-DD) as a British long date, e.g. "10 September 2026".
 */
export function formatDate(iso: string): string {
  return parseIsoDateUTC(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
