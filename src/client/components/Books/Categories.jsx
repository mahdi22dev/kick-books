import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFilter } from "../../lib/redux/files/filesSlice";
import CategorieInput from "../Form/CategorieInput";
import { MdEditNote } from "react-icons/md";
import { ToastError } from "../../lib/toast";
import { SyncLoader } from "react-spinners";
function Categories({}) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { filter } = useSelector((state) => state.files);
  const dispatch = useDispatch();

  const getCategories = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        "http://localhost:3000/api/v1/user/categorie/get"
      );
      const response = await data.json();
      console.log(response);
      if (response.success) {
        setCategories(response.categories);
      }
    } catch (error) {
      console.log(error.message);
      ToastError("Can't get the files right now");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(filter);
    getCategories();
  }, []);
  return (
    <div className='bg-secondary w-full p-3 min-h-[60px]'>
      {loading ? (
        <div className='flex justify-center items-center'>
          <SyncLoader color='#48ccbc' size={6} />
        </div>
      ) : (
        <div className='max-w-7xl flex flex-wrap justify-center items-center gap-3 mx-auto'>
          <div
            className={`p-1 cursor-pointer hover:text-white/50 capitalize ${
              filter.toUpperCase() == "ALL" ? "text-primary" : "text-white"
            }`}
            onClick={() => {
              dispatch(UpdateFilter("all"));
            }}
          >
            all
          </div>
          {categories.map((category, index) => {
            return (
              <div
                key={index}
                className={`p-1 cursor-pointer hover:text-white/50 capitalize ${
                  filter.toUpperCase() == category.name.toUpperCase()
                    ? "text-primary"
                    : "text-white"
                }`}
                onClick={() => {
                  dispatch(UpdateFilter(category.name));
                }}
              >
                {category.name}
              </div>
            );
          })}
          <CategorieInput />
          <MdEditNote className='text-4xl cursor-pointer text-accent hover:text-accent/50 duration-300 transition-all' />
        </div>
      )}
    </div>
  );
}

export default Categories;
