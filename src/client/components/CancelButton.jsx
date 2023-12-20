import React from "react";
import { useDispatch } from "react-redux";

function CancelButton({ loading, func }) {
  const dispatch = useDispatch();
  return (
    <button
      className='text-white text-md p-2 bg-black rounded-full transition-all duration-300 uppercase shadow-lg  disabled:bg-black/5'
      onClick={() => func()}
      disabled={loading}
    >
      cancel
    </button>
  );
}

export default CancelButton;
