import React from "react";
import SingleFileViewr from "./SingleFileViewr";
import { useDispatch, useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { toggleviewPDF } from "../../lib/redux/User/userSlice";
function PDFViewr({}) {
  const { viewPDF } = useSelector((state) => state.user);
  const { filePath } = useSelector((state) => state.files);

  const dispatch = useDispatch();

  const deleteFile = async () => {
    const url = "/api/v1/user/d/" + filePath;
    const data = await fetch(url);
    await data.json();
  };

  const handleViewrToggle = () => {
    dispatch(toggleviewPDF());

    if (viewPDF) {
      deleteFile();
    }
  };

  return (
    viewPDF && (
      <div className='absolute top-0 right-0 left-0 -bottom-16 min-h-screen bg-black/50 px-10 py-7 z-[200]'>
        <IoMdClose
          onClick={handleViewrToggle}
          className='text-[45px] text-primary hover:text-primary/60 transition-all duration-300 cursor-pointer'
        />
        <SingleFileViewr />
      </div>
    )
  );
}

export default PDFViewr;
