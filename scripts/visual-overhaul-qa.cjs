const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("C:/Users/11487/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const baseUrl = "http://127.0.0.1:5176/zsy-portfolio";
const outputDir = path.resolve("artifacts/visual-overhaul/after");
const viewports = process.env.VO_QA_WIDTHS
  ? process.env.VO_QA_WIDTHS.split(",").map(Number)
  : [1920, 1440, 1280, 1100, 1024, 768, 430, 390, 375];
const routes = [
  ["home", "/"],
  ["work", "/work"],
  ["eaglehub", "/work/eaglehub"],
  ["onboarding", "/work/onboarding-automation"],
  ["growth", "/work/ai-content-growth-workflow"],
  ["about", "/about"],
];

async function inspect(page, name, pathname, width) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  const response = await page.goto(`${baseUrl}${pathname}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(850);
  const metrics = await page.evaluate(({ name }) => {
    const visibleRect = (element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0
        ? { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height }
        : null;
    };
    const html = document.documentElement;
    const bodyText = document.body.innerText;
    const chinese = bodyText.match(/[\u3400-\u9fff]/g)?.length ?? 0;
    const english = bodyText.match(/[A-Za-z]/g)?.length ?? 0;
    const hero = document.querySelector(".final-hybrid__hero, .production-route__hero, .production-case__hero");
    const firstCard = name === "work" ? document.querySelector(".production-index-item.is-featured") : null;
    const figure = firstCard?.querySelector("figure");
    const copy = firstCard?.querySelector(".production-index-item__copy");
    const figureRect = figure ? visibleRect(figure) : null;
    const copyRect = copy ? visibleRect(copy) : null;
    const cardOverlap = Boolean(figureRect && copyRect
      && figureRect.left < copyRect.right
      && figureRect.right > copyRect.left
      && figureRect.top < copyRect.bottom
      && figureRect.bottom > copyRect.top);
    const unnamed = [...document.querySelectorAll("main button, main a[href]")].filter((element) => {
      const name = element.getAttribute("aria-label") || element.textContent?.trim();
      return !name;
    }).length;

    return {
      title: document.title,
      scrollWidth: html.scrollWidth,
      clientWidth: html.clientWidth,
      scrollHeight: html.scrollHeight,
      horizontalOverflow: html.scrollWidth > html.clientWidth,
      heroHeight: hero ? Math.round(hero.getBoundingClientRect().height) : null,
      chinese,
      english,
      chineseShare: Number((chinese / Math.max(1, chinese + english)).toFixed(3)),
      systemVisuals: document.querySelectorAll(".system-visual").length,
      h1Count: document.querySelectorAll("main h1").length,
      missingAlt: [...document.querySelectorAll("main img")].filter((image) => !image.hasAttribute("alt")).length,
      unnamed,
      cardOverlap,
      figureRect,
      copyRect,
    };
  }, { name });

  await page.screenshot({
    path: path.join(outputDir, `${name}-${width}${process.env.VO_QA_FULL_PAGE === "1" ? "-full" : ""}.png`),
    fullPage: process.env.VO_QA_FULL_PAGE === "1",
  });
  return { name, pathname, width, status: response?.status(), consoleErrors: errors, ...metrics };
}

(async () => {
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const results = [];
  try {
    for (const width of viewports) {
      const height = width <= 430 ? (width === 430 ? 932 : width === 390 ? 844 : 812) : width === 768 ? 1024 : 900;
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "no-preference" });
      const page = await context.newPage();
      for (const [name, pathname] of routes) results.push(await inspect(page, name, pathname, width));
      await context.close();
    }
  } finally {
    await browser.close();
  }

  fs.writeFileSync(path.join(outputDir, "visual-qa.json"), JSON.stringify(results, null, 2));
  const failures = results.filter((item) => item.status !== 200
    || item.horizontalOverflow
    || item.cardOverlap
    || item.h1Count !== 1
    || item.missingAlt
    || item.unnamed
    || item.consoleErrors.length);
  console.log(JSON.stringify({ checks: results.length, failures: failures.length, details: failures }, null, 2));
  process.exitCode = failures.length ? 1 : 0;
})();
