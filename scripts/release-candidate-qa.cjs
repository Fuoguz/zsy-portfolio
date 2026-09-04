const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("C:/Users/11487/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const baseUrl = "http://127.0.0.1:5176/zsy-portfolio";
const outputDir = path.resolve("artifacts/release-candidate");
const viewports = [
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 900 },
  { width: 1440, height: 900 },
];
const routes = [
  ["home", "/", "张少毅"],
  ["work", "/work", "以真实工作为主"],
  ["eaglehub", "/work/eaglehub", "企业人才培养管理平台"],
  ["onboarding", "/work/onboarding-automation", "新人入职流程自动化"],
  ["team", "/work/team-formation-platform", "自由组队平台"],
  ["growth", "/work/ai-content-growth-workflow", "AI 内容增长工作流"],
  ["about", "/about", "从业务问题出发"],
  ["not-found", "/does-not-exist", "PAGE NOT FOUND"],
];
const banned = [
  "INTERNAL_ONLY", "REDACT_REQUIRED", "REDACTION_REQUIRED", "TODO_USER_CONFIRM",
  "NEEDS_CONTENT", "NEEDS_VERIFICATION", "App Secret", "Table ID", "待补",
  "19963245069", "出生日期", "手机号",
];

async function inspectRoute(page, [name, pathname, heading], viewport) {
  const response = await page.goto(`${baseUrl}${pathname}`, { waitUntil: "networkidle" });
  const body = await page.locator("body").innerText();
  const html = await page.content();
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  const metadata = await page.evaluate(() => ({
    description: document.querySelector('meta[name="description"]')?.content,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    ogTitle: document.querySelector('meta[property="og:title"]')?.content,
    ogImage: document.querySelector('meta[property="og:image"]')?.content,
    twitterCard: document.querySelector('meta[name="twitter:card"]')?.content,
    robots: document.querySelector('meta[name="robots"]')?.content,
  }));
  const semantics = await page.evaluate(() => ({
    h1Count: document.querySelectorAll("main h1").length,
    missingAlt: [...document.querySelectorAll("main img")].filter((image) => !image.hasAttribute("alt")).length,
    unnamedControls: [...document.querySelectorAll("main button, main a[href]")].filter((element) => {
      const name = element.getAttribute("aria-label") || element.textContent?.trim();
      return !name;
    }).length,
  }));
  return {
    name,
    pathname,
    viewport: `${viewport.width}x${viewport.height}`,
    status: response?.status(),
    headingPass: body.toUpperCase().includes(heading),
    contentSafe: banned.every((token) => !body.includes(token) && !html.includes(token)),
    noOverflow: dimensions.scrollWidth <= dimensions.clientWidth,
    metadataPass: Boolean(metadata.description && metadata.canonical && metadata.ogTitle && metadata.ogImage && metadata.twitterCard),
    robotsPass: name === "not-found" ? metadata.robots === "noindex, nofollow" : metadata.robots === "index, follow",
    semanticsPass: semantics.h1Count === 1 && semantics.missingAlt === 0 && semantics.unnamedControls === 0,
    ...dimensions,
  };
}

async function checkLightbox(page, mobile = false) {
  await page.goto(`${baseUrl}/work/onboarding-automation`, { waitUntil: "networkidle" });
  const trigger = page.locator(".evidence-figure__zoom").first();
  await trigger.scrollIntoViewIfNeeded();
  if (mobile) {
    await trigger.tap();
  } else {
    await trigger.focus();
    await page.keyboard.press("Enter");
  }
  const dialog = page.locator("dialog.evidence-viewer[open]");
  await dialog.waitFor({ state: "visible" });
  await page.waitForTimeout(320);
  const details = await dialog.innerText();
  const openPass = await dialog.evaluate((element) => element.open)
    && details.includes("基于真实流程重新绘制")
    && details.includes("范围 · 公开安全的流程重绘")
    && await page.locator("body").evaluate((body) => body.classList.contains("has-evidence-viewer"));
  const imageVisible = await dialog.locator("img").isVisible();
  const screenshot = path.join(outputDir, mobile ? "evidence-viewer-390x844.png" : "evidence-viewer-1440x900.png");
  await page.screenshot({ path: screenshot });
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  const focusReturned = await trigger.evaluate((element) => document.activeElement === element);
  const scrollUnlocked = await page.locator("body").evaluate((body) => !body.classList.contains("has-evidence-viewer"));
  return { openPass, imageVisible, focusReturned, scrollUnlocked, screenshot };
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const responsive = [];

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport, hasTouch: viewport.width <= 430 });
    const page = await context.newPage();
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(`${viewport.width}:${message.text()}`); });
    page.on("pageerror", (error) => pageErrors.push(`${viewport.width}:${String(error)}`));
    page.on("requestfailed", (request) => failedRequests.push(`${viewport.width}:${request.url()}`));
    for (const route of routes) responsive.push(await inspectRoute(page, route, viewport));

    if (viewport.width === 1440) {
      await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
      await page.screenshot({ path: path.join(outputDir, "home-1440x900.png") });
    }
    if (viewport.width === 390) {
      await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
      await page.screenshot({ path: path.join(outputDir, "home-390x844.png") });
    }
    await context.close();
  }

  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopContext.newPage();
  const desktopLightbox = await checkLightbox(desktopPage, false);
  await desktopPage.goto(`${baseUrl}/work`, { waitUntil: "networkidle" });
  const capabilityLinks = await desktopPage.locator(".production-capability a").count();
  const firstCapabilityHref = await desktopPage.locator(".production-capability a").first().getAttribute("href");
  await desktopPage.locator(".production-capability").screenshot({ path: path.join(outputDir, "capability-evidence-1440.png") });
  await desktopPage.goto(`${baseUrl}/work/ai-content-growth-workflow`, { waitUntil: "networkidle" });
  const optimizedImageUsed = (await desktopPage.locator(".production-case img").first().getAttribute("src"))?.endsWith(".png")
    && (await desktopPage.locator(".production-case img").first().evaluate((image) => image.currentSrc))?.endsWith(".webp");
  await desktopPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await desktopPage.keyboard.press("Tab");
  const focusVisible = await desktopPage.evaluate(() => Boolean(document.activeElement?.matches(":focus-visible")));
  const performance = await desktopPage.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    return {
      domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd),
      loadMs: Math.round(navigation.loadEventEnd),
      transferredKb: Math.round(resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0) / 1024),
      resourceCount: resources.length,
    };
  });
  const assetChecks = {};
  for (const asset of ["resume.pdf", "og-image.png", "favicon.svg", "robots.txt", "sitemap.xml"]) {
    const response = await desktopContext.request.get(`${baseUrl}/${asset}`);
    assetChecks[asset] = { status: response.status(), contentType: response.headers()["content-type"] };
  }
  const internalHrefs = new Set();
  for (const pathname of ["/", "/work", "/about"]) {
    await desktopPage.goto(`${baseUrl}${pathname}`, { waitUntil: "networkidle" });
    const hrefs = await desktopPage.locator("a[href]").evaluateAll((anchors) => anchors.map((anchor) => anchor.href));
    for (const href of hrefs) {
      if (href.startsWith(baseUrl) && !href.includes("/experiment/")) internalHrefs.add(href.split("#")[0]);
    }
  }
  const internalLinks = [];
  for (const href of internalHrefs) {
    const response = await desktopContext.request.get(href);
    internalLinks.push({ href, status: response.status() });
  }
  await desktopPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  const resumeHrefPass = (await desktopPage.getByRole("link", { name: "简历", exact: true }).first().getAttribute("href")) === "/zsy-portfolio/resume.pdf";
  const contactHrefPass = (await desktopPage.getByRole("link", { name: "联系", exact: true }).first().getAttribute("href")) === "mailto:fuoguzz@gmail.com";
  await desktopContext.close();

  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const mobilePage = await mobileContext.newPage();
  const mobileLightbox = await checkLightbox(mobilePage, true);
  await mobileContext.close();

  const reducedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(`${baseUrl}/work/onboarding-automation`, { waitUntil: "networkidle" });
  const reducedMotion = await reducedPage.evaluate(() => ({
    token: getComputedStyle(document.documentElement).getPropertyValue("--motion-normal").trim(),
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
  }));
  await reducedContext.close();

  const results = {
    baseUrl,
    responsive,
    desktopLightbox,
    mobileLightbox,
    capability: { linkCount: capabilityLinks, firstHref: firstCapabilityHref, pass: capabilityLinks > 3 && firstCapabilityHref.includes("#evidence-") },
    focusVisible,
    reducedMotion,
    optimizedImageUsed,
    performance,
    assetChecks,
    internalLinks,
    resumeHrefPass,
    contactHrefPass,
    consoleErrors,
    pageErrors,
    failedRequests,
  };
  results.pass = responsive.every((result) => result.headingPass && result.contentSafe && result.noOverflow && result.metadataPass && result.robotsPass && result.semanticsPass)
    && Object.values(desktopLightbox).slice(0, 4).every(Boolean)
    && Object.values(mobileLightbox).slice(0, 4).every(Boolean)
    && results.capability.pass
    && focusVisible
    && reducedMotion.token === "0ms"
    && optimizedImageUsed
    && Object.values(assetChecks).every((asset) => asset.status === 200)
    && internalLinks.every((link) => link.status < 400)
    && resumeHrefPass
    && contactHrefPass
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
