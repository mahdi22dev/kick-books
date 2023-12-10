import React from "react";

function TextHeader({ text }) {
  return (
    <h3 className='text-left py-5 px-3 bg-primary uppercase w-[90%] lg:w-2/3 xl:w-[35%] rounded-t-lg'>
      {text}
    </h3>
  );
}

export default TextHeader;
