import React from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
function BackToHome() {
  return (
    <div className='absolute top-10 left-10 text-lg text-primary hover:text-primary/60 flex gap-2 justify-center items-center hover: transition-all duration-300'>
      <FaArrowAltCircleLeft />
      <Link to={"/"}>Home</Link>
    </div>
  );
}

export default BackToHome;
