import React from "react";
import { useDispatch } from "react-redux";
import { toggleviewUpload } from "../../lib/redux/User/userSlice";

function UploadController() {
  const dispatch = useDispatch();
  return (
    <div className='w-full min-h-[80vh] flex justify-center items-center flex-col gap-3'>
      <p>You don't have any Books</p>
      <p>Upload new book (pdf) </p>
      <button
        onClick={() => dispatch(toggleviewUpload())}
        className='text-white text-md p-2 bg-secondary hover:bg-opacity-60 rounded-full transition-all duration-300 uppercase shadow-lg hover:shadow-secondary/30 disabled:bg-black/5'
      >
        Upload
      </button>
    </div>
  );
}

export default UploadController;
