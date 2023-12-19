import React from "react";
import { SyncLoader } from "react-spinners";

function LoadingButton({ loading, text, ...props }) {
  return (
    <button
      type='submit'
      className='text-white text-md p-2 bg-secondary hover:bg-opacity-60 rounded-full transition-all duration-300 uppercase shadow-lg hover:shadow-secondary/30 disabled:bg-black/5'
      disabled={loading}
      {...props}
    >
      {loading ? <SyncLoader color='#fff' size={8} /> : text}
    </button>
  );
}

export default LoadingButton;
