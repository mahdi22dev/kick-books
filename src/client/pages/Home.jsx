import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className='flex justify-center items-center w-full min-h-screen flex-col'>
      <div className='bg-black p-5 h-28 flex justify-center items-center flex-col gap-5'>
        {/* install zod and react forms with yup and input components */}
        <h3>Sign in To Manage Your eBooks</h3>
        <button className='p-1 bg-red-100 text-black'>
          <a href={"/sign-in"}>sign in</a>
        </button>
      </div>
    </div>
  );
}
