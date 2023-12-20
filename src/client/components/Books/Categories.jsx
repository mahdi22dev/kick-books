import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateCategorieObj,
  UpdateCategories,
  UpdateFilter,
} from "../../lib/redux/files/filesSlice";
import CategorieInput from "../Form/CategorieInput";
import { MdDelete, MdEditNote } from "react-icons/md";
import { ToastError } from "../../lib/toast";
import { SyncLoader } from "react-spinners";
import {
  ToggleConfirmDelete,
  ToggleDelete,
} from "../../lib/redux/User/userSlice";
function Categories({}) {
  const [loading, setLoading] = useState(false);
  const { DeleteCategorie, refetchCategories } = useSelector(
    (state) => state.user
  );
  const { filter, categories } = useSelector((state) => state.files);
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
        dispatch(UpdateCategories(response.categories));
      }
    } catch (error) {
      console.log(error.message);
      ToastError("Can't get the files right now");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, [refetchCategories]);

  return (
    <div className='bg-secondary w-full p-3 min-h-[60px]'>
      {loading ? (
        <div className='flex justify-center items-center'>
          <SyncLoader color='#48ccbc' size={6} />
        </div>
      ) : (
        <div className='max-w-7xl flex flex-wrap justify-center items-center gap-5 mx-auto'>
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
              <>
                <div className='relative flex  justify-center items-center'>
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
                    <p> {category.name}</p>
                  </div>
                  {DeleteCategorie && (
                    <MdDelete
                      className=' text-2xl  cursor-pointer text-accent hover:text-accent/50 duration-300 transition-all '
                      onClick={() => {
                        dispatch(ToggleConfirmDelete());
                        dispatch(UpdateCategorieObj(category));
                      }}
                    />
                  )}
                </div>
              </>
            );
          })}
          <CategorieInput />
          <MdEditNote
            className='text-4xl cursor-pointer text-accent hover:text-accent/50 duration-300 transition-all'
            onClick={() => dispatch(ToggleDelete())}
          />
        </div>
      )}
    </div>
  );
}

export default Categories;
