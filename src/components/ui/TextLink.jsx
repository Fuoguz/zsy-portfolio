import { AppLink } from "../navigation/AppLink.jsx";

export function TextLink({ to, href, children, ...props }) {
  if (to) return <AppLink className="ui-text-link" to={to} {...props}>{children}</AppLink>;
  return <a className="ui-text-link" href={href} {...props}>{children}</a>;
}
