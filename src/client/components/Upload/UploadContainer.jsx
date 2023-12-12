import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleviewUpload } from "../../lib/redux/User/userSlice";
import { IoMdClose } from "react-icons/io";

function UploadContainer() {
  const { viewUpload } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleViewrToggle = () => {
    dispatch(toggleviewUpload());
  };
  return (
    viewUpload && (
      <div className='flex justify-center items-center absolute top-0 right-0 left-0 -bottom-16 min-h-screen bg-black/50 z-[100] px-10 py-7 '>
        <IoMdClose
          onClick={handleViewrToggle}
          className='text-[45px] text-primary hover:text-primary/60 transition-all duration-300 cursor-pointer absolute top-12 left-10'
        />
        <div className='flex justify-center items-center bg-primary w-[30%] min-h-[300px] p-4'>
          upload files
          <input type='file' accept='application/pdf' />
        </div>
      </div>
    )
  );
}

export default UploadContainer;
