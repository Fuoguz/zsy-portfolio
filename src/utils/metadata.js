const ensureMeta = (name) => {
  let element = document.head.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  return element;
};

const ensurePropertyMeta = (property) => {
  let element = document.head.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  return element;
};

const ensureCanonical = () => {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  return element;
};

const absoluteAsset = (asset) => new URL(asset, `${window.location.origin}${import.meta.env.BASE_URL}`).href;

export function applyRouteMetadata(route, project = null) {
  if (typeof document === "undefined") return;

  const title = project ? `${project.shortTitle} — Zhang Shaoyi` : route.title;
  const description = project?.summary || route.description;
  const canonical = new URL(window.location.pathname, window.location.origin).href;
  const socialImage = absoluteAsset("og-image.png");
  const noIndex = route.id === "not-found" || route.id === "experiment";

  document.title = title;
  ensureMeta("description").setAttribute("content", description);
  ensureMeta("robots").setAttribute("content", noIndex ? "noindex, nofollow" : "index, follow");
  ensurePropertyMeta("og:title").setAttribute("content", title);
  ensurePropertyMeta("og:description").setAttribute("content", description);
  ensurePropertyMeta("og:type").setAttribute("content", project ? "article" : "website");
  ensurePropertyMeta("og:url").setAttribute("content", canonical);
  ensurePropertyMeta("og:image").setAttribute("content", socialImage);
  ensurePropertyMeta("og:image:alt").setAttribute("content", "Zhang Shaoyi — Product Operations & AI Portfolio");
  ensurePropertyMeta("og:site_name").setAttribute("content", "Zhang Shaoyi Portfolio");
  ensureMeta("twitter:card").setAttribute("content", "summary_large_image");
  ensureMeta("twitter:title").setAttribute("content", title);
  ensureMeta("twitter:description").setAttribute("content", description);
  ensureMeta("twitter:image").setAttribute("content", socialImage);
  ensureCanonical().setAttribute("href", canonical);
}
