const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("C:/Users/11487/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const baseUrl = "http://127.0.0.1:5176/zsy-portfolio";
const outputDir = path.resolve("artifacts/design/g5a/cases");
const routes = [
  ["eaglehub", "/work/eaglehub", "EAGLEHUB"],
  ["onboarding", "/work/onboarding-automation", "TEX AI ONBOARDING"],
  ["team-formation", "/work/team-formation-platform", "TEAM FORMATION"],
  ["content-growth", "/work/ai-content-growth-workflow", "AI CONTENT GROWTH"],
];
const bannedTokens = [
  "INTERNAL_ONLY",
  "REDACT_REQUIRED",
  "REDACTION_REQUIRED",
  "TODO_USER_CONFIRM",
  "NEEDS_CONTENT",
  "NEEDS_VERIFICATION",
  "App Secret",
  "Table ID",
  "internalNotes",
  "restrictedFields",
  "sourceNote",
  "19963245069",
  "待补",
];

async function inspect(page, name, pathname, heading, width, height) {
  await page.setViewportSize({ width, height });
  await page.goto(`${baseUrl}${pathname}`, { waitUntil: "networkidle" });
  const body = await page.locator("body").innerText();
  const normalizedBody = body.toUpperCase();
  const html = await page.content();
  const imageSources = await page.locator("img").evaluateAll((images) => images.map((image) => image.currentSrc || image.src));
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  const evidenceCount = await page.locator(".evidence-figure").count();
  const provenance = await page.locator(".evidence-figure .ui-caption strong").allInnerTexts();
  const headings = await page.locator("h2").allInnerTexts();
  const requiredSections = ["Context", "Problem", "Constraints", "Contribution Boundary", "Key decisions", "Outcome / Results", "Reflection"];
  const missingSections = requiredSections.filter((section) => !normalizedBody.includes(section.toUpperCase()));
  const topPath = path.join(outputDir, `${name}-${width}x${height}.png`);
  await page.evaluate(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
  await page.waitForTimeout(50);
  await page.screenshot({ path: topPath, fullPage: false });
  const leadEvidence = page.locator(".production-case__lead-evidence");
  await leadEvidence.evaluate((element) => window.scrollTo({ top: element.offsetTop - 58, left: 0, behavior: "auto" }));
  await page.waitForTimeout(50);
  const evidencePath = path.join(outputDir, `${name}-evidence-${width}x${height}.png`);
  await page.screenshot({ path: evidencePath, fullPage: false });

  return {
    name,
    pathname,
    viewport: `${width}x${height}`,
    headingPass: normalizedBody.includes(heading),
    requiredSectionsPass: missingSections.length === 0,
    missingSections,
    evidenceCount,
    headings,
    provenance,
    provenancePass: provenance.length === evidenceCount && provenance.every(Boolean),
    contentSafe: bannedTokens.every((token) => !body.includes(token) && !html.includes(token) && imageSources.every((src) => !src.includes(token))),
    noOverflow: dimensions.scrollWidth <= dimensions.clientWidth,
    imagesPublicSafe: imageSources.every((src) => !src.includes("internal-assets") && !src.includes("resume-non-final")),
    screenshots: [topPath, evidencePath],
    ...dimensions,
  };
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(String(error)));
  page.on("requestfailed", (request) => failedRequests.push(request.url()));

  const results = [];
  for (const route of routes) {
    results.push(await inspect(page, ...route, 1440, 900));
    results.push(await inspect(page, ...route, 390, 844));
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  const homepage = {
    startProjects: await page.locator(".final-hybrid__start-list button strong").allInnerTexts(),
    visualSources: await page.locator(".final-hybrid__start-preview img").evaluateAll((images) => images.map((image) => image.currentSrc || image.src)),
  };
  homepage.pass = homepage.startProjects.length === 3
    && homepage.startProjects.some((title) => title.includes("Onboarding"))
    && homepage.visualSources.every((src) => !src.includes("internal-assets"));

  const report = { baseUrl, results, homepage, consoleErrors, pageErrors, failedRequests };
  report.pass = results.every((result) => (
    result.headingPass
    && result.requiredSectionsPass
    && result.evidenceCount >= 2
    && result.provenancePass
    && result.contentSafe
    && result.noOverflow
    && result.imagesPublicSafe
  )) && homepage.pass && consoleErrors.length === 0 && pageErrors.length === 0 && failedRequests.length === 0;
  fs.writeFileSync(path.join(outputDir, "qa-results.json"), JSON.stringify(report, null, 2));
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  await browser.close();
  if (!report.pass) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
