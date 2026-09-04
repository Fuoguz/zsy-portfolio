import { navigate } from "../../app/navigation.js";
import { withBasePath } from "../../utils/paths.js";

export function AppLink({ to, onClick, children, ...props }) {
  const href = withBasePath(to);
  const handleClick = (event) => {
    onClick?.(event);
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) return;
    event.preventDefault();
    navigate(to);
  };

  return <a href={href} onClick={handleClick} {...props}>{children}</a>;
}

