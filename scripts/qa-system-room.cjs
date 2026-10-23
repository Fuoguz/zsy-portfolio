const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:5178/zsy-portfolio/';
const output = 'artifacts/system-room/qa';
fs.mkdirSync(output, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true, channel: process.env.QA_BROWSER_CHANNEL || 'msedge' });
  const results = [], errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => { errors.push(e.message); console.error('PAGEERROR', e.stack); });
  const check = (name, value) => { assert.ok(value, name); results.push(name); };
  const shot = name => page.screenshot({ path: `${output}/${name}.png` });
  await page.goto(base, { waitUntil: 'networkidle' });
  check('Desktop defaults to a static preview', await page.locator('.system-room canvas').count() === 0);
  check('Workroom occupies less than one desktop viewport', await page.locator('.system-room').evaluate(element => element.getBoundingClientRect().height < innerHeight));
  await page.getByRole('button', { name: '探索 3D', exact: true }).click();
  await page.locator('.system-room__canvas.is-ready').waitFor();
  await page.waitForTimeout(800);
  check('One semantic h1', await page.locator('main h1').count() === 1);
  check('Desktop explicitly loads one canvas', await page.locator('.system-room canvas').count() === 1);
  await shot('hero-1440');
  // Verify real mesh picking, not only the parallel HTML controls.
  const sceneBounds = await page.locator('.system-room canvas').boundingBox();
  await page.mouse.click(sceneBounds.x + sceneBounds.width * .48, sceneBounds.y + sceneBounds.height * .43);
  await page.waitForTimeout(1500);
  check('Clicking the center screen selects Eagle', await page.locator('.system-room').getAttribute('data-chapter') === 'eagle');
  for (const [index, id] of ['hero', 'eagle', 'automation', 'build'].entries()) {
    const scrollBefore = await page.evaluate(() => window.scrollY);
    await page.locator('.system-room__chapters button').nth(index).click();
    await page.waitForTimeout(1700);
    check(`Chapter ${id} updates`, await page.locator('.system-room').getAttribute('data-chapter') === id);
    check(`Chapter ${id} does not move the page`, Math.abs(await page.evaluate(() => window.scrollY) - scrollBefore) < 2);
    const actual = Number(await page.locator('.system-room__canvas').getAttribute('data-camera-progress'));
    check(`Camera ${id} converges`, Math.abs(actual - index) < .02);
    await shot(`${id}-1440`);
  }
  await page.mouse.move(20, 20); await page.waitForTimeout(1500);
  const frames = await page.locator('.system-room__canvas').getAttribute('data-frames');
  await page.waitForTimeout(600);
  check('Idle renderer stops', frames === await page.locator('.system-room__canvas').getAttribute('data-frames'));
  const calls = Number(await page.locator('.system-room__canvas').getAttribute('data-draw-calls'));
  check('Steady frame within 40 draw calls', calls <= 40);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await page.waitForTimeout(500);
  const offscreen = await page.locator('.system-room__canvas').getAttribute('data-frames');
  await page.waitForTimeout(500);
  check('Offscreen renderer stops', offscreen === await page.locator('.system-room__canvas').getAttribute('data-frames'));
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(1300);
  check('Scrolling preserves the selected chapter', await page.locator('.system-room').getAttribute('data-chapter') === 'build');
  await page.locator('.system-room__tools button').click();
  check('Static switch disposes canvas', await page.locator('.system-room canvas').count() === 0);
  await page.locator('.system-room__tools button').click(); await page.locator('.system-room__canvas.is-ready').waitFor();
  check('3D can be re-enabled', await page.locator('.system-room canvas').count() === 1);
  await page.locator('.system-room__chapters button').nth(1).click(); await page.waitForTimeout(1200);
  await page.locator('.system-room__caption a').click();
  await page.waitForURL('**/work/eaglehub');
  await page.getByRole('heading', { name: /企业人才培养管理平台/, level: 1 }).waitFor();
  check('Eagle CTA opens actual case', (await page.locator('#main-content').innerText()).includes('企业人才培养管理平台'));
  check('Route unmount removes canvas', await page.locator('canvas').count() === 0);

  for (const width of [375, 390, 768, 1024, 1920]) {
    await page.setViewportSize({ width, height: width < 960 ? 844 : 900 });
    await page.goto(base, { waitUntil: 'networkidle' }); await page.waitForTimeout(1500);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    check(`No horizontal overflow at ${width}px`, !overflow);
    check(`Viewport ${width}px defaults to poster`, await page.locator('.system-room canvas').count() === 0);
    await shot(`hero-${width}`);
    if (width === 390) {
      await page.locator('.system-room__chapters button').nth(2).click();
      check('Mobile chapter buttons work', await page.locator('.system-room').getAttribute('data-chapter') === 'automation');
      await page.locator('.system-room__tools button').click(); await page.locator('.system-room__canvas.is-ready').waitFor();
      await page.waitForTimeout(800); await shot('mobile-3d');
      check('Mobile explicitly enables 3D', await page.locator('canvas').count() === 1);
    }
  }
  const reduced = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const reducedRequests = [];
  reduced.on('request', r => { if (r.url().includes('.glb') || r.url().includes('systemRoomRenderer')) reducedRequests.push(r.url()); });
  await reduced.goto(base, { waitUntil: 'networkidle' }); await reduced.waitForTimeout(1200);
  check('Reduced motion does not load 3D', reducedRequests.length === 0);
  await reduced.locator('.system-room__chapters button').nth(3).click();
  check('Reduced motion can explore static chapters', await reduced.locator('.system-room').getAttribute('data-chapter') === 'build');
  await reduced.close();
  const fallback = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await fallback.route('**/system-room.glb', route => route.abort());
  await fallback.goto(base, { waitUntil: 'networkidle' });
  await fallback.getByRole('button', { name: '探索 3D', exact: true }).click();
  await fallback.getByRole('status').filter({ hasText: '已切换为静态预览' }).waitFor();
  check('Failed model retains poster and navigation', await fallback.locator('.system-room__poster:not(.is-hidden)').isVisible());
  await fallback.screenshot({ path: `${output}/fallback.png` });
  await fallback.close();
  const noGL = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await noGL.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) { return type.startsWith('webgl') ? null : original.call(this, type, ...args); };
  });
  await noGL.goto(base, { waitUntil: 'networkidle' });
  await noGL.getByRole('button', { name: '探索 3D', exact: true }).click();
  await noGL.getByRole('status').filter({ hasText: '已切换为静态预览' }).waitFor();
  check('WebGL unavailable keeps page usable', await noGL.locator('.system-room__cta').isVisible());
  await noGL.close();
  check('No page runtime errors', errors.length === 0);
  fs.writeFileSync(`${output}/report.json`, JSON.stringify({ passed: results.length, results, steadyDrawCalls: calls, errors }, null, 2));
  console.log(JSON.stringify({ passed: results.length, steadyDrawCalls: calls, errors }));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
