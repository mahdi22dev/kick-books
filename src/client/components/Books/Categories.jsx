import React from "react";
import { categories } from "../../lib/config/data";

function Categories() {
  return (
    <div className='bg-secondary w-full p-3 '>
      <div className='max-w-7xl flex flex-wrap justify-center items-center gap-3 mx-auto'>
        <div className=' p-1 cursor-pointer text-primary'>All</div>
        {categories.map((category, index) => {
          return (
            <div key={index} className=' p-1 cursor-pointer text-white'>
              {category.category}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
