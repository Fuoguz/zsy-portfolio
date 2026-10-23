import { motion } from "framer-motion";

const EASE = [0.2, 0.7, 0.1, 1];

export function Reveal({ as = "div", delay = 0, y = 24, children, ...props }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...props}
    >
      {children}
    </Component>
  );
}

export { EASE };
