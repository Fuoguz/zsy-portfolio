export function normalizeBasePath(basePath = "/") {
  const value = String(basePath || "/").trim();
  if (value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
}

export const BASE_PATH = normalizeBasePath(import.meta.env?.BASE_URL ?? "/");

export function withBasePath(targetPath, basePath = BASE_PATH) {
  if (/^(?:[a-z]+:|#)/i.test(targetPath)) return targetPath;
  const base = normalizeBasePath(basePath);
  const target = `/${String(targetPath).replace(/^\/+/, "")}`;
  return base === "/" ? target : `${base.replace(/\/$/, "")}${target}`;
}

export function stripBasePath(pathname, basePath = BASE_PATH) {
  const base = normalizeBasePath(basePath);
  const cleanPathname = `/${String(pathname || "/").replace(/^\/+/, "")}`;
  if (base === "/") return cleanPathname;
  const baseWithoutTrailingSlash = base.replace(/\/$/, "");
  if (cleanPathname === baseWithoutTrailingSlash) return "/";
  if (cleanPathname.startsWith(`${baseWithoutTrailingSlash}/`)) {
    return cleanPathname.slice(baseWithoutTrailingSlash.length) || "/";
  }
  return cleanPathname;
}

export const assetPath = (asset, basePath = BASE_PATH) => withBasePath(asset, basePath);
export const resumePath = (basePath = BASE_PATH) => withBasePath("resume.pdf", basePath);
export const projectPath = (slug, basePath = BASE_PATH) => withBasePath(`work/${slug}`, basePath);
export const publicResumeHref = (resume, basePath = BASE_PATH) => resume?.available
  ? resumePath(basePath)
  : resume?.href;
