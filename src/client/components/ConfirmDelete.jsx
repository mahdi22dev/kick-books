import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseConfirmDelete } from "../lib/redux/User/userSlice";
import LoadingButton from "./Form/LoadingButton";
import CancelButton from "./CancelButton";

function ConfirmDelete() {
  const { ConfirmDelete } = useSelector((state) => state.user);
  const { categorieObj } = useSelector((state) => state.files);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handledelete = async () => {
    setLoading(true);
    try {
      console.log(categorieObj);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    ConfirmDelete && (
      <div className='flex justify-center items-center absolute top-0 right-0 left-0 -bottom-16 min-h-screen bg-black/50 z-[100] px-10 py-7'>
        <div className='relative flex justify-center items-center flex-col gap-6 bg-primary min-h-[200px] min-w-[80%] md:min-w-[300px] p-4'>
          <p> are you sure you whant to delete this categorie?</p>
          <p>{categorieObj && categorieObj.name}</p>
          <div className='flex justify-center items-center gap-5'>
            <LoadingButton
              loading={loading}
              text={"Delete"}
              onClick={() => handledelete()}
            />
            <CancelButton />
          </div>
        </div>
      </div>
    )
  );
}

export default ConfirmDelete;
