import React from "react";

function Image({ imgSrc }) {
  return (
    <div className='min-h-[300px] '>
      {/* Display the image */}
      <img src={imgSrc} alt='img' className='w-full h-full' />
    </div>
  );
}

export default Image;
