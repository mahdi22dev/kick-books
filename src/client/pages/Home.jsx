import React from "react";
import img1 from "../assets/m1.png";
export default function Home() {
  return (
    <div className='flex justify-center items-center w-full min-h-screen'>
      <img src={img1} alt='' />
      <div className=' p-5 h-28 flex justify-center items-center flex-col gap-5 '>
        <h1 className='text-xl uppercase'>LogIn To Manage Your books</h1>
        <p className='font-normal text-sm'>
          <span>kickBooks</span> is free online storage and pdf reader
        </p>
        <a
          href={"/sign-in"}
          className='text-white px-4 py-2 bg-primary hover:bg-opacity-60 rounded-full transition-all duration-300 uppercase shadow-lg hover:shadow-primary/30'
        >
          sign in
        </a>
      </div>
    </div>
  );
}
