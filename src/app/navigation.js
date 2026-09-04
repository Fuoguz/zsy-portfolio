import { withBasePath } from "../utils/paths.js";

export function navigate(to) {
  const href = withBasePath(to);
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (current === href) return;
  window.history.pushState({}, "", href);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
