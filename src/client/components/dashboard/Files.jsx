import React from "react";
import { useDispatch } from "react-redux";
import { toggleviewPDF } from "../../lib/redux/User/userSlice";

function Files() {
  const dispatch = useDispatch();
  const handleViewrToggle = () => {
    dispatch(toggleviewPDF());
  };
  return (
    <div className='p-5 w-full h-full'>
      pdf files
      <div className='grid grid-cols-3 gap-5'>
        <div className='bg-primary/60' onClick={handleViewrToggle}>
          <p>title: {"ppp.pdf"}</p>
        </div>
        <div className='bg-primary/60' onClick={handleViewrToggle}>
          <p>title: {"ppp.pdf"}</p>
        </div>
        <div className='bg-primary/60' onClick={handleViewrToggle}>
          <p>title: {"ppp.pdf"}</p>
        </div>
      </div>
    </div>
  );
}

export default Files;
