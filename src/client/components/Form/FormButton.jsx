import React from "react";
import { SyncLoader } from "react-spinners";

function FormButton({ loading, text }) {
  return (
    <button
      type='submit'
      className='text-white p-2 bg-primary hover:bg-opacity-60 rounded-full transition-all duration-300 uppercase shadow-lg hover:shadow-primary/30 disabled:bg-black/5'
      disabled={loading}
    >
      {loading ? <SyncLoader color='#fff' size={8} /> : text || ""}
    </button>
  );
}

export default FormButton;
