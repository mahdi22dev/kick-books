import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { toggleSidebar } from "../../lib/redux/User/userSlice";
function SideNav() {
  const dispatch = useDispatch();

  const { isSideBarOpen } = useSelector((state) => state.user);
  useEffect(() => {}, []);
  const handleToggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <div
      className={`bg-primary min-h-screen transition-all w-1/6 relative ${
        isSideBarOpen ? " block" : "hidden"
      }`}
    >
      <TfiArrowCircleLeft
        onClick={handleToggle}
        className='text-[30px] text-black absolute top-4 right-3 cursor-pointer transition-all duration-300 hover:text-opacity-50'
      />
      recent
    </div>
  );
}

export default SideNav;
