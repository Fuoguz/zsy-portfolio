const { copyFileSync, existsSync } = require("node:fs");
const path = require("node:path");

const outputDirectory = path.resolve(process.argv[2] || "dist");
const indexFile = path.join(outputDirectory, "index.html");
const fallbackFile = path.join(outputDirectory, "404.html");

if (!existsSync(indexFile)) {
  throw new Error(`Cannot create SPA fallback: ${indexFile} does not exist.`);
}

copyFileSync(indexFile, fallbackFile);
process.stdout.write(`SPA fallback created: ${fallbackFile}\n`);
