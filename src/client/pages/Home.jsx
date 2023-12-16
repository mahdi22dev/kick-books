import React from "react";
import img1 from "../assets/m1.png";
export default function Home() {
  return (
    <div className='flex flex-col  md:flex-row  justify-center items-center w-full min-h-screen p-4 max-w-7xl mx-auto'>
      <img src={img1} alt='' className='md:w-2/3 mb-9' />
      <div className=' md:w-1/3 p-5 h-28 flex justify-center items-center flex-col gap-5 '>
        <h1 className='text-xl uppercase'>LogIn To Manage Your Books</h1>
        <p className='font-normal text-md'>
          <span>kickBooks</span> is a free online storage and reader for your
          books (pdf)
        </p>
        <p className='font-normal text-sm'>(1GB of online storage for free)</p>
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
