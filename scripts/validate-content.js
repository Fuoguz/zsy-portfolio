import { assertValidContent } from "../src/content/validation.js";
import { contentData } from "../src/data/index.js";

assertValidContent(contentData);
process.stdout.write(
  `Content validation PASS (${contentData.projects.length} projects, ${contentData.claims.length} claims, ${contentData.evidence.length} evidence records)\n`,
);

