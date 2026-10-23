import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { getCaseClaimGroups } from "../src/utils/claim-presentation.js";

import {
  getHomePageContent,
  getHomeFeaturedProjects,
  getAboutPageContent,
  getCapabilityEvidenceMap,
  getPublicProject,
  getPublicProjectSlugs,
  getRolePageContent,
  getRoleViewContent,
  getWorkIndexContent,
} from "../src/content/public.js";

const BANNED_PUBLIC_TOKENS = [
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
  "待补",
];

const assertPublicSafe = (value) => {
  const serialized = JSON.stringify(value);
  for (const token of BANNED_PUBLIC_TOKENS) {
    assert.equal(serialized.includes(token), false, `public output leaked ${token}`);
  }
};

test("homepage model contains only selector-approved projects and claims", () => {
  const home = getHomePageContent();

  assert.equal(home.profile.englishName, "Zhang Shaoyi");
  assert.deepEqual(home.startProjects.map((project) => project.slug), [
    "eaglehub",
    "onboarding-automation",
    "ai-content-growth-workflow",
    "globridge",
  ]);
  assert.deepEqual(home.quickProofs.map((claim) => claim.value), [
    "2h → 20–30min",
    "400–500 人",
    "≈480 对",
  ]);
  assert.ok(home.startProjects.every((project) => project.evidence.length > 0));
  assert.equal(home.labProjects.some((project) => project.slug === "digest"), false);
  assertPublicSafe(home);
});

test("case claim presentation prioritizes efficiency and keeps scale and rules in context", () => {
  const growth = getCaseClaimGroups(getPublicProject("ai-content-growth-workflow"));
  assert.deepEqual(growth.hero.map(claim => claim.id), ["content-growth-cycle", "content-growth-cadence"]);
  assert.equal(growth.context[0].id, "content-growth-account");
  assert.match(growth.context[0].publicCaption, /不归因为本人增长/);
  assert.equal(growth.remainingResults[0].id, "content-growth-top-article");

  const eagle = getCaseClaimGroups(getPublicProject("eaglehub"));
  assert.equal(eagle.hero.length, 0);
  assert.deepEqual(eagle.context.map(claim => claim.id), ["eaglehub-mentor-pairs", "eaglehub-cycle"]);
  const team = getCaseClaimGroups(getPublicProject("team-formation-platform"));
  assert.equal(team.hero.length, 0);
  assert.equal(team.context.find(claim => claim.id === "team-formation-rules").kind, "BUSINESS_RULE");

  const sample = getCaseClaimGroups(getPublicProject("onboarding-automation")).hero[0];
  assert.equal(sample.kind, "TEST_RESULT");
  assert.match(sample.publicCaption, /特定 Dry-run.*不代表生产准确率/);
});

test("resume policy exposes only the privacy-safe public PDF", () => {
  const { profile } = getHomePageContent();

  assert.equal(profile.resume.available, true);
  assert.equal(profile.resume.href, "resume.pdf");
  assert.equal(JSON.stringify(profile).includes("resume-non-final"), false);
});

test("work index separates featured, business evidence and lab without equal weighting", () => {
  const work = getWorkIndexContent();

  assert.deepEqual(work.featured.map((project) => project.slug), [
    "eaglehub",
    "onboarding-automation",
    "ai-content-growth-workflow",
    "globridge",
  ]);
  assert.ok(work.business.some((project) => project.slug === "team-formation-platform"));
  assert.ok(work.business.some((project) => project.slug === "eagle-training-operations"));
  assert.deepEqual(work.lab.map((project) => project.slug), [
    "memory-museum",
    "video-motion",
    "game-ads-simulation",
  ]);
  assertPublicSafe(work);
});

test("public project routes expose enabled case studies only", () => {
  const slugs = getPublicProjectSlugs();

  assert.ok(slugs.includes("eaglehub"));
  assert.ok(slugs.includes("onboarding-automation"));
  assert.ok(slugs.includes("ai-content-growth-workflow"));
  assert.equal(slugs.includes("eagle-training-operations"), false);
  assert.equal(getPublicProject("onboarding-automation")?.deliveryStatus, "VALIDATED_PROTOTYPE");
  assertPublicSafe(getPublicProject("eaglehub"));
});

test("onboarding case exposes only redacted evidence and scopes 11 / 11 to one dry-run sample", () => {
  const onboarding = getPublicProject("onboarding-automation");
  const serialized = JSON.stringify(onboarding);

  assert.ok(onboarding.evidence.length >= 3);
  assert.ok(onboarding.evidence.every((item) => item.publicSafe === true));
  assert.ok(onboarding.claims.some((claim) => claim.value === "11 / 11"));
  assert.match(serialized, /Dry-run/);
  assert.doesNotMatch(serialized, /100%|生产准确率[:： ]?\d/);
  assertPublicSafe(onboarding);
});

test("capability evidence mapping reuses public projects and filters hidden work", () => {
  const mapping = getCapabilityEvidenceMap();
  const serialized = JSON.stringify(mapping);

  assert.ok(mapping.length >= 5);
  assert.ok(mapping.some((capability) => capability.projectIds.includes("eaglehub")));
  assert.ok(mapping.some((capability) => capability.projectIds.includes("onboarding-automation")));
  assert.ok(mapping.every((capability) => capability.projects.every((project) => project.slug && project.evidence.length)));
  assert.equal(serialized.includes("globridge"), true);
  assert.equal(serialized.includes("digest"), false);
  assertPublicSafe(mapping);
});

test("Globridge is a shipped case with public provenance and bounded AI delivery mapping", () => {
  const project = getPublicProject("globridge");
  assert.equal(project.deliveryStatus, "SHIPPED");
  assert.equal(project.decisions.length, 7);
  assert.match(project.decisionStory.options[project.decisionStory.selectedOption], /保留 CloudBase 后端/);
  assert.match(project.decisionStory.problem, /交接信息并不完整/);
  assert.ok(project.decisionStory.validation.some(item => item.includes("/sandbox/")));
  assert.equal(project.decisionStory.publicCaption, "本人项目经历说明");
  assert.ok(project.evidence.every(item => item.publicSafe && item.provenanceLabel === "真实公开作品"));
  assert.equal(project.evidence.find(item => item.type === "LIVE_DEMO").asset, "https://www.globridge.cn/");
  assert.ok(project.evidence.some(item => item.type === "VIDEO"));
  assert.match(project.contributionBoundary.notClaimed.join(" "), /业务数字、客户案例与市场成绩/);
  assert.equal(project.claims.length, 0);
  for (const lens of ["aiNative", "aiProduct", "productOps", "projectOps"]) {
    assert.ok(getRoleViewContent(lens).projects.some(item => item.id === "globridge"));
  }
  assert.ok(getRolePageContent("ai-native").projects.some(item => item.id === "globridge"));
  assertPublicSafe(project);
});

test("case study model renders only real optional sections and safe evidence", () => {
  const growth = getPublicProject("ai-content-growth-workflow");
  const eagleHub = getPublicProject("eaglehub");

  assert.ok(growth.problem);
  assert.ok(growth.decisions.length > 0);
  assert.ok(growth.outcomes.length > 0);
  assert.ok(growth.evidence.every((item) => item.publicSafe === true));
  assert.ok(eagleHub.contributionBoundary.notClaimed.length > 0);
  assert.match(
    growth.claims.find((claim) => claim.id === "content-growth-account").context,
    /账号总规模.*不是本人增长成果/,
  );
  assert.equal(getPublicProject("eagle-training-operations"), null);
  assertPublicSafe(growth);
});

test("role views reorder one shared public project source", () => {
  const all = getRoleViewContent("all");
  const product = getRoleViewContent("aiProduct");
  const growth = getRoleViewContent("growth");

  assert.equal(product.projects[0].slug, "eaglehub");
  assert.equal(growth.projects[0].slug, "ai-content-growth-workflow");
  assert.deepEqual(
    new Set(all.projects.map((project) => project.id)),
    new Set(product.allProjects.map((project) => project.id)),
  );
  assertPublicSafe(product);
});

test("home role sorting changes the lead without losing or duplicating featured projects", () => {
  const home = getHomePageContent();
  const defaults = getHomeFeaturedProjects();
  assert.deepEqual(defaults.map((project) => project.id), home.featuredProjects.map((project) => project.id));
  assert.equal(getHomeFeaturedProjects("growth")[0].slug, "ai-content-growth-workflow");
  for (const lens of home.roleLenses) {
    const sorted = getHomeFeaturedProjects(lens.id);
    assert.equal(sorted.length, defaults.length);
    assert.deepEqual(new Set(sorted.map((project) => project.id)), new Set(defaults.map((project) => project.id)));
    if (lens.id !== "all") {
      for (let index = 1; index < sorted.length; index++) {
        assert.ok((sorted[index - 1].roleLensRelevance[lens.id] ?? 0) >= (sorted[index].roleLensRelevance[lens.id] ?? 0));
      }
    }
    assertPublicSafe(sorted);
  }
  assert.deepEqual(getHomeFeaturedProjects("unknown"), defaults);
});

test("route-level role pages reuse shared projects and about remains public-safe", () => {
  const product = getRolePageContent("product");
  const growth = getRolePageContent("growth");
  const creative = getRolePageContent("creative");
  const about = getAboutPageContent();

  assert.equal(product.projects[0].slug, "eaglehub");
  assert.equal(growth.projects[0].slug, "ai-content-growth-workflow");
  assert.deepEqual(creative.projects.map((project) => project.slug), [
    "memory-museum",
    "video-motion",
    "game-ads-simulation",
  ]);
  assert.equal(about.experience[0].publicLabel, "TRANSSION");
  assertPublicSafe(product);
  assertPublicSafe(creative);
  assertPublicSafe(about);
});

test("production UI imports the public facade rather than raw project data", () => {
  const roots = ["src/pages", "src/sections", "src/components"];
  const sourceFiles = [];
  const collect = (directory) => {
    for (const entry of readdirSync(directory)) {
      const path = join(directory, entry);
      if (statSync(path).isDirectory()) collect(path);
      else if (/\.(?:js|jsx)$/.test(path)) sourceFiles.push(path);
    }
  };
  for (const root of roots) collect(root);

  for (const file of sourceFiles) {
    const source = readFileSync(file, "utf8");
    assert.equal(/data\/projects\.js|data\/index\.js/.test(source), false, `${file} imports raw content`);
  }
});

test("production public facade is backed by a generated sanitized snapshot", () => {
  const facadeSource = readFileSync("src/content/public.js", "utf8");
  const generatedSource = readFileSync("src/content/generated-public-data.js", "utf8");

  assert.equal(/data\/projects\.js|data\/index\.js|content\/selectors\.js/.test(facadeSource), false);
  for (const token of [
    "internalNotes",
    "restrictedFields",
    "sourceNote",
    "INTERNAL_ONLY",
    "REDACTION_REQUIRED",
    "NEEDS_VERIFICATION",
    "digest",
  ]) {
    assert.equal(generatedSource.includes(token), false, `generated public snapshot leaked ${token}`);
  }
});
