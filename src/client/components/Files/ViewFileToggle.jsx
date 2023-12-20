import React from "react";
import { ScaleVariants } from "../../lib/variants";
import { AnimatePresence, motion } from "framer-motion";
import { FaBookReader } from "react-icons/fa";

function ViewFileToggle({ scaleAnimation, file, ...props }) {
  const MotionFaBookReader = motion(FaBookReader);
  return (
    <AnimatePresence>
      <motion.div
        layout
        variants={ScaleVariants}
        initial={"initial"}
        animate={"animate"}
        exit={"exit"}
        key={scaleAnimation}
        className={`${
          scaleAnimation
            ? "absolute flex justify-center items-center"
            : "hidden"
        }  top-0 bottom-0 right-0 left-0 overflow-hidden overflow-x-hidden w bg-black/30 z-[100] `}
        {...props}
      >
        <MotionFaBookReader
          className='[font-size:_clamp(15px,4vw,40px)] text-primary gridIcon'
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          key={scaleAnimation}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default ViewFileToggle;
