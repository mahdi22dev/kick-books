import React from "react";
import SingleFile from "./SingleFileViewr";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { toggleviewPDF } from "../../lib/redux/User/userSlice";
function PDFViewr() {
  const { viewPDF } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleViewrToggle = () => {
    dispatch(toggleviewPDF());
  };
  return (
    viewPDF && (
      <div className='absolute top-0 right-0 left-0 -bottom-16 min-h-screen bg-black/50 z-[100] px-10 py-7'>
        <IoMdClose
          onClick={handleViewrToggle}
          className='text-[45px] text-primary hover:text-primary/60 transition-all duration-300 cursor-pointer'
        />
        {/* <div className='bg-primary h-6 w-[80%] fixed top-11 left-24 mx-auto'>
          bar
        </div> */}
        <SingleFile />
      </div>
    )
  );
}

export default PDFViewr;
