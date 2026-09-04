import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";

import { getPublicProjectSlugs } from "../src/content/public.js";

const requiredPublicAssets = ["public/resume.pdf", "public/og-image.png", "public/favicon.svg"];
const missing = requiredPublicAssets.filter((asset) => !existsSync(asset));
const textExtensions = new Set([".html", ".json", ".svg", ".txt"]);
const blockedTokens = [
  "TODO_USER_CONFIRM",
  "INTERNAL_ONLY",
  "REDACT_REQUIRED",
  "REDACTION_REQUIRED",
  "NEEDS_CONTENT",
  "NEEDS_VERIFICATION",
  "APP SECRET",
  "TABLE ID",
  "待补",
  "出生日期",
  "手机号",
];
const textFiles = [];

function collectTextFiles(directory) {
  if (!existsSync(directory)) return;
  for (const entry of readdirSync(directory)) {
    const file = join(directory, entry);
    if (statSync(file).isDirectory()) collectTextFiles(file);
    else if (textExtensions.has(extname(file).toLowerCase())) textFiles.push(file);
  }
}

collectTextFiles("public");
collectTextFiles("release-assets");
if (existsSync("src/content/generated-public-data.js")) textFiles.push("src/content/generated-public-data.js");

const leaks = [];
for (const file of textFiles) {
  const source = readFileSync(file, "utf8");
  const normalized = source.toUpperCase();
  for (const token of blockedTokens) {
    if (normalized.includes(token)) leaks.push(`${file}: ${token}`);
  }
  if (/(?<!\d)1[3-9]\d{9}(?!\d)/.test(source)) leaks.push(`${file}: POSSIBLE_CN_MOBILE`);
  if (/https?:\/\/[^\s"']*(?:corp|internal|intranet)/i.test(source)) leaks.push(`${file}: POSSIBLE_INTERNAL_URL`);
}

const resumeSource = existsSync("release-assets/public-resume.html")
  ? readFileSync("release-assets/public-resume.html", "utf8")
  : "";
for (const requiredFact of ["张少毅", "上海政法学院", "2027 Graduate", "fuoguzz@gmail.com"]) {
  if (!resumeSource.includes(requiredFact)) leaks.push(`release-assets/public-resume.html: MISSING_${requiredFact}`);
}

const sitemapSource = existsSync("public/sitemap.xml")
  ? readFileSync("public/sitemap.xml", "utf8")
  : "";
for (const slug of getPublicProjectSlugs()) {
  if (!sitemapSource.includes(`/work/${slug}</loc>`)) leaks.push(`public/sitemap.xml: MISSING_PUBLIC_ROUTE_${slug}`);
}

if (missing.length || leaks.length) {
  console.error(`Public asset validation failed: ${[...missing.map((file) => `MISSING_${file}`), ...leaks].join(", ")}`);
  process.exitCode = 1;
} else {
  console.log(`Public asset validation PASS (${textFiles.length} public/release text assets scanned; privacy-safe resume included)`);
}
