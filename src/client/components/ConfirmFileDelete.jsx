import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "./Form/LoadingButton";
import CancelButton from "./CancelButton";
import {
  CloseFileConfirmDelete,
  refetchToggle,
} from "../lib/redux/User/userSlice";
import { ToastError, ToastMessage } from "../lib/toast";

function ConfirmFileDelete() {
  const { ConfirmFileDelete } = useSelector((state) => state.user);
  const { singlFile } = useSelector((state) => state.files);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(singlFile);

  const handledelete = async () => {
    console.log("deleting file....");
    try {
      setLoading(true);
      const data = await fetch("/api/v1/user/file/d/" + singlFile.id);
      const response = await data.json();
      console.log(response);
      if (response?.success) {
        dispatch(refetchToggle());
        dispatch(CloseFileConfirmDelete());
        ToastMessage("File Deleted Successfly");
      }
      if (!response?.success) {
        ToastError("Error accur when trying to delete the file");
      }
    } catch (error) {
      console.log(error.message);
      ToastError("there was an error please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    ConfirmFileDelete && (
      <div className='flex justify-center items-center absolute top-0 right-0 left-0 bottom-0 bg-black/50 z-[100] px-10 py-7'>
        <div className='relative flex justify-center items-center flex-col gap-6 bg-primary min-h-[200px] min-w-[80%] md:min-w-[300px] p-4'>
          <p className='capitalize'>
            are you sure you whant to delete this file?
          </p>
          <p className='text-accent'>{singlFile && singlFile.fileName}</p>
          <div className='flex justify-center items-center gap-5'>
            <LoadingButton
              loading={loading}
              text={"Delete"}
              onClick={() => handledelete()}
            />
            <CancelButton
              loading={loading}
              func={() => dispatch(CloseFileConfirmDelete())}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default ConfirmFileDelete;
