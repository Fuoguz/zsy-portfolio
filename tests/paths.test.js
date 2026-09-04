import assert from "node:assert/strict";
import test from "node:test";

import {
  assetPath,
  normalizeBasePath,
  projectPath,
  resumePath,
  stripBasePath,
  withBasePath,
} from "../src/utils/paths.js";

test("normalizes GitHub Pages and root-domain base paths", () => {
  assert.equal(normalizeBasePath("zsy-portfolio"), "/zsy-portfolio/");
  assert.equal(normalizeBasePath("/zsy-portfolio/"), "/zsy-portfolio/");
  assert.equal(normalizeBasePath("/"), "/");
});

test("adds and strips a configured base without scattering repository names", () => {
  assert.equal(withBasePath("/work/eaglehub", "/zsy-portfolio/"), "/zsy-portfolio/work/eaglehub");
  assert.equal(stripBasePath("/zsy-portfolio/work/eaglehub", "/zsy-portfolio/"), "/work/eaglehub");
  assert.equal(withBasePath("/work/eaglehub", "/"), "/work/eaglehub");
});

test("central helpers build asset, resume and project paths", () => {
  assert.equal(assetPath("assets/example.png", "/zsy-portfolio/"), "/zsy-portfolio/assets/example.png");
  assert.equal(resumePath("/"), "/resume.pdf");
  assert.equal(projectPath("eaglehub", "/zsy-portfolio/"), "/zsy-portfolio/work/eaglehub");
});

test("path helper preserves external links and unmatched paths", () => {
  assert.equal(withBasePath("https://example.com", "/zsy-portfolio/"), "https://example.com");
  assert.equal(withBasePath("#section", "/zsy-portfolio/"), "#section");
  assert.equal(stripBasePath("/outside/work", "/zsy-portfolio/"), "/outside/work");
});
