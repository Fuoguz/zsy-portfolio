import { AppLink } from "../navigation/AppLink.jsx";

export function Button({ to, href, variant = "primary", children, ...props }) {
  const className = `ui-button ui-button--${variant}`;
  if (to) return <AppLink className={className} to={to} {...props}>{children}</AppLink>;
  if (href) return <a className={className} href={href} {...props}>{children}</a>;
  return <button className={className} type="button" {...props}>{children}</button>;
}
