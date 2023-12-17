import React from "react";
import { category } from "../../lib/config/data";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFilter } from "../../lib/redux/files/filesSlice";

function Categories({ setFilesData, filesData }) {
  const dispatch = useDispatch();
  const { files, filter } = useSelector((state) => state.files);
  return (
    <div className='bg-secondary w-full p-3 '>
      <div className='max-w-7xl flex flex-wrap justify-center items-center gap-3 mx-auto'>
        {category.map((category, index) => {
          return (
            <div
              key={index}
              className={`p-1 cursor-pointer hover:text-white/50 ${
                filter.toUpperCase() == category.category.toUpperCase()
                  ? "text-primary"
                  : "text-white"
              }`}
              onClick={() => {
                const filtredFiles = files.filter(
                  (file) =>
                    file.category.toUpperCase() ===
                    category.category.toUpperCase()
                );
                setFilesData(filtredFiles);
                dispatch(UpdateFilter(category.category));
              }}
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
