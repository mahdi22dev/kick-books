import React from "react";
import { GrPowerShutdown } from "react-icons/gr";
const handleLogOut = async () => {
  try {
    const data = await fetch("/api/v1/auth/logout");
    const response = await data.json();
    if (response?.success) {
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error.message);
  }
};

const LogOut = () => {
  return (
    <GrPowerShutdown
      onClick={handleLogOut}
      className='cursor-pointer text-[25px] text-primary transition-all duration-200 hover:text-primary/30 '
    />
  );
};

export default LogOut;
