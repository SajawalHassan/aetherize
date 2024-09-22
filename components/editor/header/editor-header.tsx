import { motion } from "framer-motion";

interface Props {}

export const EditorHeader = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.25, delay: 0.25 }}
      className="flex items-center">
      <div className="flex items-center"></div>
    </motion.div>
  );
};
