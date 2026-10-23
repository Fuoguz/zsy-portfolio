const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const base = process.env.QA_BASE || 'http://127.0.0.1:5180/zsy-portfolio';
  const out = 'artifacts/globridge';
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  for (const [width, motion] of [[1440, 'no-preference'], [390, 'no-preference'], [1440, 'reduce'], [390, 'reduce'], [1024, 'no-preference']]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: motion });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of ['/work', '/work/globridge', '/ai-native', '/']) {
      await page.goto(base + route, { waitUntil: 'networkidle' });
      await page.locator('main').waitFor();
      assert.ok((await page.locator('body').innerText()).includes('Globridge'), `${route}: project missing`);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${route}: overflow at ${width}`);
      if (route === '/work/globridge') {
        assert.equal(await page.locator('.globridge-live').getAttribute('href'), 'https://www.globridge.cn/');
        const preview = page.locator('.globridge-preview');
        await preview.scrollIntoViewIfNeeded();
        if (motion === 'reduce' || width < 768) {
          assert.equal(await preview.locator('video').count(), 0);
          assert.ok(await preview.locator('img').evaluate(img => img.complete && img.naturalWidth > 0));
        } else {
          await page.waitForFunction(() => document.querySelector('.globridge-preview video')?.currentTime > 0);
          await preview.getByRole('button', { name: '暂停预览' }).click();
          assert.ok(await preview.locator('video').evaluate(v => v.paused));
          await preview.getByRole('button', { name: '播放预览' }).click();
          await page.waitForFunction(() => !document.querySelector('.globridge-preview video').paused);
        }
        await page.screenshot({ path: `${out}/case-preview-${width}-${motion}.png` });
        for (const img of await page.locator('main img').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(i => i.decode()); }
        await page.screenshot({ path: `${out}/case-full-${width}-${motion}.png`, fullPage: true });
      }
      if (route === '/') {
        await page.getByRole('button', { name: 'AI 原生', exact: true }).click();
        await page.getByRole('link', { name: '打开 AI Native View ↗' }).click();
        await page.waitForURL('**/ai-native');
        assert.ok(await page.locator('a[href$="/work/globridge"]').count());
      }
      results.push({ width, motion, route, passed: true });
    }
    assert.deepEqual(errors, []);
    await context.close();
  }
  const failPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await failPage.route('**/preview.webm', route => route.abort());
  await failPage.goto(base + '/work/globridge');
  await failPage.locator('.globridge-preview').scrollIntoViewIfNeeded();
  await failPage.locator('.globridge-preview img').waitFor();
  assert.ok(await failPage.locator('.globridge-preview img').evaluate(i => i.complete && i.naturalWidth > 0));
  results.push({ fallback: 'video request failure', passed: true });
  await browser.close();
  fs.writeFileSync(`${out}/qa.json`, JSON.stringify(results, null, 2));
  console.log(`${results.length} browser checks passed.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
