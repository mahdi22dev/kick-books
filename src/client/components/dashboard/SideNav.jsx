import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function SideNav() {
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.files);
  useEffect(() => {
    console.log(files);
  }, []);
  return (
    <div className='bg-primary absolute top-0 bottom-0 left-0 right-[70%] md:right-[85%]'>
      recent
    </div>
  );
}

export default SideNav;
