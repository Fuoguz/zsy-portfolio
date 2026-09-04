const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("C:/Users/11487/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const baseUrl = "http://127.0.0.1:5176/zsy-portfolio/";
const outputDir = path.resolve("artifacts/design/g4b/home");
const banned = [
  "INTERNAL_ONLY",
  "REDACT_REQUIRED",
  "REDACTION_REQUIRED",
  "TODO_USER_CONFIRM",
  "NEEDS_CONTENT",
  "NEEDS_VERIFICATION",
  "App Secret",
  "Table ID",
];
const viewports = [
  ["1440x900", 1440, 900],
  ["1024", 1024, 768],
  ["768", 768, 1024],
  ["430", 430, 932],
  ["390x844", 390, 844],
  ["375", 375, 812],
];

async function dimensions(page) {
  return page.evaluate(() => ({
    bodyScrollWidth: document.body.scrollWidth,
    bodyClientWidth: document.body.clientWidth,
    documentScrollWidth: document.documentElement.scrollWidth,
    documentClientWidth: document.documentElement.clientWidth,
  }));
}

async function main() {
  console.log("qa:start");
  fs.mkdirSync(outputDir, { recursive: true });
  const results = { baseUrl, screenshots: [], checks: {} };
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  console.log("qa:browser-ready");
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(String(error)));
  page.on("requestfailed", (request) => failedRequests.push(request.url()));
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  console.log("qa:desktop-loaded");

  const bodyText = await page.locator("body").innerText();
  const html = await page.content();
  const imageSources = await page.locator("img").evaluateAll((elements) => elements.map((element) => element.currentSrc || element.src));
  results.checks.contentSafety = banned.every((token) =>
    !bodyText.includes(token) && !html.includes(token) && imageSources.every((source) => !source.includes(token)),
  );
  results.checks.resumeIsSafeRequest = (await page.locator('a:has-text("Resume")').evaluateAll(
    (elements) => elements.map((element) => element.href),
  )).every((href) => href.startsWith("mailto:"));

  const startButtons = page.locator(".final-hybrid__start-list button");
  results.checks.startHereCount = await startButtons.count();
  await startButtons.nth(1).hover();
  results.checks.startHereHover = (await page.locator("#start-preview").innerText()).includes("AI Content Growth");
  await startButtons.nth(0).focus();
  results.checks.startHereKeyboardFocus = (await page.locator("#start-preview").innerText()).includes("EagleHub");

  await page.getByRole("button", { name: "Growth", exact: true }).click();
  results.checks.roleLens = (await page.locator(".final-hybrid__lens-summary").innerText()).includes("AI Content Growth");
  console.log("qa:desktop-interactions");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  console.log("qa:mobile-loaded");
  const menuTrigger = page.locator('button[aria-controls="production-mobile-menu"]');
  await menuTrigger.click();
  console.log("qa:menu-opened");
  results.checks.menuExpanded = await menuTrigger.getAttribute("aria-expanded") === "true";
  results.checks.menuFocusEntered = await page.evaluate(() => document.activeElement?.closest("#production-mobile-menu") !== null);
  await page.keyboard.press("Escape");
  console.log("qa:menu-escaped");
  results.checks.menuEscapeClose = await menuTrigger.getAttribute("aria-expanded") === "false";
  results.checks.menuFocusReturned = await menuTrigger.evaluate((element) => document.activeElement === element);

  await page.locator(".final-hybrid__start-list button").nth(1).click();
  console.log("qa:start-touch-clicked");
  results.checks.startHereTouch = (await page.locator("#start-preview").innerText()).includes("AI Content Growth");
  console.log("qa:mobile-interactions");

  const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  await reduced.goto(baseUrl, { waitUntil: "networkidle" });
  results.checks.reducedMotionContentVisible = await reduced.locator("#main-content").isVisible();
  results.checks.reducedMotionToken = await reduced.evaluate(
    () => getComputedStyle(document.documentElement).getPropertyValue("--motion-normal").trim() === "0ms",
  );
  await reduced.close();
  console.log("qa:reduced-motion");

  for (const [name, width, height] of viewports) {
    await page.setViewportSize({ width, height });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    const metric = await dimensions(page);
    const noOverflow = metric.documentScrollWidth <= metric.documentClientWidth;
    const screenshotPath = path.join(outputDir, `home-${name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    results.screenshots.push({ name, path: screenshotPath, noOverflow, ...metric });
    console.log(`qa:screenshot:${name}`);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  const fullPath = path.join(outputDir, "home-390-full-page.png");
  await page.screenshot({ path: fullPath, fullPage: true });
  results.screenshots.push({ name: "390-full-page", path: fullPath });
  console.log("qa:screenshot:390-full-page");
  results.consoleErrors = consoleErrors;
  results.pageErrors = pageErrors;
  results.failedRequests = failedRequests;
  await browser.close();

  const booleanChecks = Object.values(results.checks).filter((value) => typeof value === "boolean");
  results.pass = booleanChecks.every(Boolean)
    && results.checks.startHereCount === 2
    && results.screenshots.every((item) => item.noOverflow ?? true)
    && consoleErrors.length === 0
    && pageErrors.length === 0
    && failedRequests.length === 0;
  fs.writeFileSync(path.join(outputDir, "qa-results.json"), JSON.stringify(results, null, 2));
  process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
  if (!results.pass) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
