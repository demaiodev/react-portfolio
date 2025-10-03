import { motion } from "framer-motion";

const PageTransitionWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 50 },
  };
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ type: "tween", duration: 0.4 }}
      className="min-h-[calc(100vh-64px)] p-8 max-w-6xl mx-auto"
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionWrapper;
