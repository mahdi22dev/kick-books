import React from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
function MessagesUI({ message, error }) {
  return (
    <div className='min-h-[50px]'>
      {message && (
        <div className='flex justify-start items-center gap-2'>
          <IoCheckmarkSharp className='text-green-500' />
          <p className='text-green-500 capitalize'>{message}</p>
        </div>
      )}

      {error && (
        <div className='flex justify-start items-center gap-2'>
          <MdErrorOutline className='text-red-500' />
          <p className='text-red-500 capitalize'>{error}</p>
        </div>
      )}
    </div>
  );
}

export default MessagesUI;
