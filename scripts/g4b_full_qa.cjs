const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("C:/Users/11487/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const baseUrl = "http://127.0.0.1:5176/zsy-portfolio";
const outputDir = path.resolve("artifacts/design/g4b/routes");
const banned = [
  "INTERNAL_ONLY",
  "REDACT_REQUIRED",
  "REDACTION_REQUIRED",
  "TODO_USER_CONFIRM",
  "NEEDS_CONTENT",
  "NEEDS_VERIFICATION",
  "App Secret",
  "Table ID",
  "19963245069",
];
const routes = [
  ["home", "/", "ZHANG SHAOYI"],
  ["work", "/work", "SELECTED WORK"],
  ["eaglehub", "/work/eaglehub", "EAGLEHUB"],
  ["content-growth", "/work/ai-content-growth-workflow", "AI CONTENT GROWTH"],
  ["team-formation", "/work/team-formation-platform", "TEAM FORMATION"],
  ["memory-museum", "/work/memory-museum", "MEMORY MUSEUM"],
  ["video-motion", "/work/video-motion", "VIDEO / MOTION"],
  ["game-ads", "/work/game-ads-simulation", "GAME ADS"],
  ["product", "/product", "FROM BUSINESS RULES"],
  ["growth", "/growth", "SYSTEMS BEHIND"],
  ["creative", "/creative", "CREATIVE RANGE"],
  ["about", "/about", "WORK ACROSS PRODUCT"],
  ["experiment-final", "/experiment/final", "ZHANG SHAOYI"],
  ["hidden-onboarding", "/work/onboarding-automation", "PROJECT NOT AVAILABLE"],
  ["hidden-digest", "/work/digest", "PROJECT NOT AVAILABLE"],
  ["unknown", "/not-a-route", "PAGE NOT FOUND"],
];

async function inspectRoute(page, [name, pathname, heading]) {
  await page.goto(`${baseUrl}${pathname}`, { waitUntil: "networkidle" });
  const body = await page.locator("body").innerText();
  const html = await page.content();
  const imageSources = await page.locator("img").evaluateAll((elements) => elements.map((element) => element.currentSrc || element.src));
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  const description = await page.locator('meta[name="description"]').getAttribute("content");
  const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
  const ogDescription = await page.locator('meta[property="og:description"]').getAttribute("content");
  return {
    name,
    pathname,
    title: await page.title(),
    headingPass: body.toUpperCase().includes(heading),
    contentSafe: banned.every((token) => !body.includes(token) && !html.includes(token) && imageSources.every((src) => !src.includes(token))),
    noOverflow: dimensions.scrollWidth <= dimensions.clientWidth,
    metadataPass: Boolean(description && ogTitle && ogDescription),
    ...dimensions,
  };
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(String(error)));
  page.on("requestfailed", (request) => failedRequests.push(request.url()));

  const desktop = [];
  for (const route of routes) desktop.push(await inspectRoute(page, route));

  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Work", exact: true }).first().click();
  await page.waitForURL("**/zsy-portfolio/work");
  await page.locator(".production-route__hero h1").waitFor();
  const spaNavigationUrl = page.url();
  const spaNavigationText = await page.locator(".production-route__hero h1").innerText();
  const spaNavigation = spaNavigationUrl.endsWith("/zsy-portfolio/work")
    && spaNavigationText.toUpperCase().includes("SELECTED WORK");

  await page.goto(`${baseUrl}/work/ai-content-growth-workflow`, { waitUntil: "networkidle" });
  const imageDimensions = await page.locator(".production-case img").first().evaluate((image) => ({
    widthAttribute: image.getAttribute("width"),
    heightAttribute: image.getAttribute("height"),
    loading: image.getAttribute("loading"),
    decoding: image.getAttribute("decoding"),
  }));
  const caseScreenshot = path.join(outputDir, "case-growth-1440x900.png");
  await page.screenshot({ path: caseScreenshot, fullPage: false });
  await page.goto(`${baseUrl}/work`, { waitUntil: "networkidle" });
  const workScreenshot = path.join(outputDir, "work-1440x900.png");
  await page.screenshot({ path: workScreenshot, fullPage: false });
  await page.goto(`${baseUrl}/about`, { waitUntil: "networkidle" });
  const aboutScreenshot = path.join(outputDir, "about-1440x900.png");
  await page.screenshot({ path: aboutScreenshot, fullPage: false });

  await page.setViewportSize({ width: 390, height: 844 });
  const mobile = [];
  for (const route of routes) mobile.push(await inspectRoute(page, route));
  await page.goto(`${baseUrl}/work`, { waitUntil: "networkidle" });
  const mobileWorkScreenshot = path.join(outputDir, "work-390x844.png");
  await page.screenshot({ path: mobileWorkScreenshot, fullPage: false });
  await page.goto(`${baseUrl}/work/ai-content-growth-workflow`, { waitUntil: "networkidle" });
  const mobileCaseScreenshot = path.join(outputDir, "case-growth-390x844.png");
  await page.screenshot({ path: mobileCaseScreenshot, fullPage: false });

  const results = {
    baseUrl,
    desktop,
    mobile,
    interactions: { spaNavigation, spaNavigationUrl, spaNavigationText },
    imageInfrastructure: imageDimensions,
    screenshots: [caseScreenshot, workScreenshot, aboutScreenshot, mobileWorkScreenshot, mobileCaseScreenshot],
    consoleErrors,
    pageErrors,
    failedRequests,
  };
  results.pass = [...desktop, ...mobile].every((route) => route.headingPass && route.contentSafe && route.noOverflow && route.metadataPass)
    && spaNavigation
    && imageDimensions.widthAttribute
    && imageDimensions.heightAttribute
    && imageDimensions.decoding === "async"
    && consoleErrors.length === 0
    && pageErrors.length === 0
    && failedRequests.length === 0;
  fs.writeFileSync(path.join(outputDir, "qa-results.json"), JSON.stringify(results, null, 2));
  process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
  await browser.close();
  if (!results.pass) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
