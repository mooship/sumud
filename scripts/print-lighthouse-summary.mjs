#!/usr/bin/env node
import { appendFileSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Prints every category score and a handful of key performance audits from
 * an `lhci collect`/`autorun` results directory, for every run and every
 * URL -- not just the failing/warning ones the `treosh/lighthouse-ci-action`
 * job log shows. Also appends the same table to `$GITHUB_STEP_SUMMARY` when
 * running in GitHub Actions, so scores are visible on the run summary page
 * without digging through logs or downloading the report artifact.
 */

const CATEGORY_IDS = ["performance", "accessibility", "best-practices", "seo"];
const AUDIT_IDS = [
  "largest-contentful-paint",
  "total-blocking-time",
  "cumulative-layout-shift",
  "dom-size",
];

function formatScore(score) {
  return score === null || score === undefined
    ? "—"
    : String(Math.round(score * 100));
}

function readReports(resultsDir) {
  const files = readdirSync(resultsDir).filter(
    (name) => name.startsWith("lhr-") && name.endsWith(".json"),
  );
  return files
    .map((file) => JSON.parse(readFileSync(join(resultsDir, file), "utf8")))
    .sort(
      (a, b) =>
        a.requestedUrl.localeCompare(b.requestedUrl) ||
        a.fetchTime.localeCompare(b.fetchTime),
    );
}

function groupByUrl(reports) {
  const byUrl = new Map();
  for (const report of reports) {
    const existing = byUrl.get(report.requestedUrl) ?? [];
    existing.push(report);
    byUrl.set(report.requestedUrl, existing);
  }
  return byUrl;
}

function buildSummary(reports) {
  const lines = ["## Lighthouse report", ""];
  for (const [url, urlReports] of groupByUrl(reports)) {
    lines.push(`### ${url}`, "");
    lines.push(`| Run | ${CATEGORY_IDS.join(" | ")} |`);
    lines.push(`| --- | ${CATEGORY_IDS.map(() => "---").join(" | ")} |`);
    for (const [index, report] of urlReports.entries()) {
      const scores = CATEGORY_IDS.map((id) =>
        formatScore(report.categories[id]?.score),
      );
      lines.push(`| ${index + 1} | ${scores.join(" | ")} |`);
    }
    lines.push("");
    lines.push(`| Run | ${AUDIT_IDS.join(" | ")} |`);
    lines.push(`| --- | ${AUDIT_IDS.map(() => "---").join(" | ")} |`);
    for (const [index, report] of urlReports.entries()) {
      const values = AUDIT_IDS.map(
        (id) => report.audits[id]?.displayValue ?? "—",
      );
      lines.push(`| ${index + 1} | ${values.join(" | ")} |`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

const resultsDir = process.argv[2] ?? ".lighthouseci";
const reports = readReports(resultsDir);

if (reports.length === 0) {
  console.log(`No Lighthouse reports found in ${resultsDir}`);
  process.exit(0);
}

const summary = buildSummary(reports);
console.log(summary);

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${summary}\n`);
}
