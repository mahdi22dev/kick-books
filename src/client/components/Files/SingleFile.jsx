import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { EditVariants, ScaleVariants } from "../../lib/variants";
import { CloseAnimation, StartAnimation } from "../../lib/redux/User/userSlice";
import { FaBookReader } from "react-icons/fa";
function SingleFile() {
  const MotionFaBookReader = motion(FaBookReader);
  const { ScaleAnimation } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleHover = () => {
    dispatch(StartAnimation());
    console.log(ScaleAnimation);
  };

  const handleLeave = () => {
    dispatch(CloseAnimation());
    console.log(ScaleAnimation);
  };

  return (
    <div
      className='relative bg-red-500 w-96 h-96 cursor-pointer overflow-hidden'
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className=''></div>
      <AnimatePresence>
        <motion.div
          layout
          variants={ScaleVariants}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          key={ScaleAnimation}
          className={`${
            ScaleAnimation
              ? "absolute flex justify-center items-center"
              : "hidden"
          }  top-0 bottom-0 right-0 left-0 overflow-hidden overflow-x-hidden w bg-primary z-[100] `}
        >
          <MotionFaBookReader
            className='text-5xl'
            initial={"initial"}
            animate={"animate"}
            exit={"exit"}
            key={ScaleAnimation}
          />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {" "}
        <motion.div
          layout
          variants={EditVariants}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          key={ScaleAnimation}
          className={`${
            ScaleAnimation
              ? "absolute flex justify-center items-center"
              : "hidden"
          }  top-4 right-2 overflow-hidden overflow-x-hidden bg-secondary z-[100] `}
        >
          edit
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default SingleFile;
