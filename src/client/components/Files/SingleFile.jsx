import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { EditVariants } from "../../lib/variants";
import {
  ToggleFileConfirmDelete,
  toggleviewPDF,
} from "../../lib/redux/User/userSlice";
import { FaFolder } from "react-icons/fa";
import {
  UpdateSingleFile,
  updateFileId,
} from "../../lib/redux/files/filesSlice";
import { MdDelete } from "react-icons/md";
import img from "../../assets/img.jpg";
import { isUserUsingMobile } from "../../lib/utils";
import ViewFileToggle from "./ViewFileToggle";

function SingleFile({ file }) {
  const [isMobile, setIsMobile] = useState(false);
  const [scaleAnimation, setScaleAnimation] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMobile(isUserUsingMobile());
    setScaleAnimation(isUserUsingMobile());
  }, []);

  const handleViewrToggle = (id) => {
    dispatch(updateFileId(id));
    dispatch(toggleviewPDF());
  };

  const handleHover = () => {
    if (!isMobile) {
      setScaleAnimation(true);
    }
  };

  const handleLeave = () => {
    if (!isMobile) {
      setScaleAnimation(false);
    }
  };
  const decodedFileName = decodeURIComponent(file.fileName);
  return (
    <div
      className='relative bg-primary max-h-[400px] max-w-sm  cursor-pointer overflow-hidden shadow-lg hover:shadow-primary/25'
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className='p-1 text-center '>
        <p>{decodedFileName}</p>
      </div>
      <img src={img} alt='img' className='w-full h-full' />
      <ViewFileToggle
        scaleAnimation={scaleAnimation}
        file={file}
        onClick={() => handleViewrToggle(file.id)}
      />
      <AnimatePresence>
        <motion.div
          layout
          variants={EditVariants}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          key={scaleAnimation}
          className={`${
            scaleAnimation
              ? "absolute flex justify-center items-center"
              : "hidden"
          }  top-4 right-2 overflow-hidden overflow-x-hidden z-[100] `}
        >
          <FaFolder
            className='[font-size:_clamp(12px,4vw,35px)] text-primary gridIcon'
            onClick={() => console.log("move clicked")}
          />
          <MdDelete
            className='[font-size:_clamp(12px,4vw,35px)] text-primary gridIcon'
            onClick={() => {
              console.log("delete clicked");
              dispatch(UpdateSingleFile(file));
              dispatch(ToggleFileConfirmDelete());
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default SingleFile;
