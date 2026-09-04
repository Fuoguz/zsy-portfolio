const path = require("node:path");
const fs = require("node:fs");
const { pathToFileURL } = require("node:url");
const { chromium } = require("C:/Users/11487/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

async function main() {
  fs.mkdirSync(path.resolve("artifacts/release-candidate"), { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });

  const resumePage = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await resumePage.goto(pathToFileURL(path.resolve("release-assets/public-resume.html")).href, { waitUntil: "load" });
  await resumePage.pdf({
    path: path.resolve("public/resume.pdf"),
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
  await resumePage.screenshot({
    path: path.resolve("artifacts/release-candidate/resume-preview.png"),
    fullPage: true,
  });

  const ogPage = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await ogPage.goto(pathToFileURL(path.resolve("release-assets/og-image.svg")).href, { waitUntil: "load" });
  await ogPage.screenshot({ path: path.resolve("public/og-image.png"), type: "png" });

  await browser.close();
  process.stdout.write("Release assets rendered: public/resume.pdf, public/og-image.png\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
