import assert from "node:assert/strict";
import test from "node:test";

import { resolveRoute } from "../src/app/route-config.js";

const knownProjectSlugs = ["eaglehub", "ai-content-growth-workflow"];

test("resolves the production home route under both base strategies", () => {
  assert.equal(resolveRoute("/zsy-portfolio/", { basePath: "/zsy-portfolio/", knownProjectSlugs }).id, "home");
  assert.equal(resolveRoute("/", { basePath: "/", knownProjectSlugs }).id, "home");
});

test("resolves a known project route and decodes its stable slug", () => {
  const route = resolveRoute("/zsy-portfolio/work/eaglehub", {
    basePath: "/zsy-portfolio/",
    knownProjectSlugs,
  });

  assert.equal(route.id, "project");
  assert.equal(route.params.slug, "eaglehub");
});

test("unknown project paths resolve to project-not-found", () => {
  const route = resolveRoute("/work/not-a-project", {
    basePath: "/",
    knownProjectSlugs,
  });

  assert.equal(route.id, "not-found");
  assert.equal(route.reason, "unknown-project");
});

test("unknown application paths resolve to 404", () => {
  const route = resolveRoute("/not-a-route", { basePath: "/", knownProjectSlugs });
  assert.equal(route.id, "not-found");
  assert.equal(route.reason, "unknown-route");
});

test("keeps Final Hybrid and historical experiments available as visual references", () => {
  const route = resolveRoute("/zsy-portfolio/experiment/final", {
    basePath: "/zsy-portfolio/",
    knownProjectSlugs,
  });

  assert.equal(route.id, "experiment");
  assert.equal(route.params.experimentId, "final");
});

test("resolves every static route and tolerates trailing slash/query input", () => {
  for (const id of ["work", "product", "growth", "creative", "about"]) {
    const route = resolveRoute(`/zsy-portfolio/${id}/?source=test`, {
      basePath: "/zsy-portfolio/",
      knownProjectSlugs,
    });
    assert.equal(route.id, id);
  }
});

test("project route can resolve before a known-slug list is supplied", () => {
  const route = resolveRoute("/work/eaglehub", { basePath: "/" });
  assert.equal(route.id, "project");
});
