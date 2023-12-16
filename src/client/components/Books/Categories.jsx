import React from "react";
import { category } from "../../lib/config/data";
import { useDispatch } from "react-redux";
import { categoryFilter } from "../../lib/redux/files/filesSlice";

function Categories() {
  const dispatch = useDispatch();
  return (
    <div className='bg-secondary w-full p-3 '>
      <div className='max-w-7xl flex flex-wrap justify-center items-center gap-3 mx-auto'>
        <div className=' p-1 cursor-pointer text-primary hover:text-white/50'>
          All
        </div>
        {category.map((category, index) => {
          return (
            <div
              key={index}
              className='p-1 cursor-pointer hover:text-white/50 text-white'
              onClick={() => dispatch(categoryFilter(category.category))}
            >
              {category.category}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
