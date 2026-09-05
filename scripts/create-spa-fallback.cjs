const { copyFileSync, existsSync, readFileSync, writeFileSync, mkdirSync } = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const outputDirectory = path.resolve(process.argv[2] || "dist");
const indexFile = path.join(outputDirectory, "index.html");
const fallbackFile = path.join(outputDirectory, "404.html");

if (!existsSync(indexFile)) {
  throw new Error(`Cannot create SPA fallback: ${indexFile} does not exist.`);
}

copyFileSync(indexFile, fallbackFile);
process.stdout.write(`SPA fallback created: ${fallbackFile}\n`);

// Pages serves known routes as real documents (HTTP 200), with share metadata
// available before React loads. Unknown paths still use the existing 404 shell.
async function createRouteEntries() {
  const { getPublicProjectSlugs, getPublicProject } = await import(pathToFileURL(path.resolve("src/content/public.js")));
  const { routeDefinitions } = await import(pathToFileURL(path.resolve("src/app/route-config.js")));
  const { projectTitleZh } = await import(pathToFileURL(path.resolve("src/utils/presentation.js")));
  const template = readFileSync(indexFile, "utf8");
  const canonicalBase = template.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonicalBase) throw new Error("Missing canonical URL in release document");
  const routes = routeDefinitions.filter((route) => route.path !== "/" && !/[:*]/.test(route.path));
  for (const slug of getPublicProjectSlugs()) {
    const project = getPublicProject(slug);
    routes.push({ path: `/work/${slug}`, title: `${projectTitleZh(project)} — 张少毅`, description: project.summary });
  }
  const escape = (text) => String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  for (const route of routes) {
    const url = new URL(`${route.path.slice(1)}/`, canonicalBase).href;
    let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escape(route.title)}</title>`);
    for (const key of ["description", "og:description", "twitter:description"]) {
      html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*(")`), (_, start, end) => `${start}${escape(route.description)}${end}`);
    }
    for (const key of ["og:title", "twitter:title"]) {
      html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*(")`), (_, start, end) => `${start}${escape(route.title)}${end}`);
    }
    html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, (_, start, end) => `${start}${url}${end}`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, (_, start, end) => `${start}${url}${end}`);
    if (route.path.startsWith("/work/")) html = html.replace('property="og:type" content="website"', 'property="og:type" content="article"');
    const directory = path.join(outputDirectory, route.path.slice(1));
    mkdirSync(directory, { recursive: true });
    writeFileSync(path.join(directory, "index.html"), html);
  }
  writeFileSync(path.join(outputDirectory, ".nojekyll"), "");
  process.stdout.write(`Public route documents created: ${routes.length}\n`);
}
createRouteEntries().catch((error) => { console.error(error.message); process.exitCode = 1; });
