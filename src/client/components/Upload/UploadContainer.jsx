import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  refetchToggle,
  toggleviewUpload,
} from "../../lib/redux/User/userSlice";
import { IoMdClose } from "react-icons/io";
import { SyncLoader } from "react-spinners";
import { ToastError, ToastMessage } from "../../lib/toast";
import { UploadSchema } from "../../lib/vidationSchema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function UploadContainer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { viewUpload } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(UploadSchema) });

  const handleViewrToggle = () => {
    setFile(null);
    dispatch(toggleviewUpload());
  };

  const handleFileSumbit = async (fileData) => {
    console.log(fileData.file);

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", fileData.file);
      console.log(formData);
      const data = await fetch("/user/upload", {
        method: "POST",
        body: formData,
      });

      const response = await data.json();
      if (response.success) {
        setFile(null);
        ToastMessage(response?.message);
        handleViewrToggle();
        dispatch(refetchToggle());
      }
    } catch (error) {
      console.log(error.message);
      ToastError("There's an Error Please try Again Later");
    } finally {
      setLoading(false);
    }
  };

  return (
    viewUpload && (
      <div className='flex justify-center items-center absolute top-0 right-0 left-0 -bottom-16 min-h-screen bg-black/50 z-[100] px-10 py-7 '>
        <form
          onSubmit={handleSubmit(handleFileSumbit)}
          className='relative flex justify-center items-center flex-col gap-10 bg-primary min-h-[300px] min-w-[80%] md:min-w-[300px] p-4'
        >
          <IoMdClose
            onClick={handleViewrToggle}
            className='text-[25px] text-secondary hover:text-secondary/60 transition-all duration-300 cursor-pointer absolute top-2 left-2'
          />
          <div className='flex items-center space-x-4'>
            <label className='inline-flex items-center px-4 py-2 bg-secondary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-secondary/50 active:bg-accent focus:outline-none focus:border-blue-700 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150'>
              <span>Choose a file</span>
              <Controller
                name={"file"}
                control={control}
                disabled={loading}
                render={({ field: { value, onChange, ...field } }) => (
                  <input
                    type={"file"}
                    className='hidden'
                    accept='application/pdf'
                    {...field}
                    onChange={(event) => {
                      onChange(event.target.files[0]);
                      console.log(event.target.files[0]);
                      setFile(event.target.files[0]);
                    }}
                  />
                )}
              />
            </label>
          </div>{" "}
          {errors.file && ToastError(errors.file.message)}
          {file && (
            <div className='max-w-xs whitespace-normal'>{file?.name}</div>
          )}
          <button
            type='submit'
            className='text-white text-md p-2 bg-secondary hover:bg-opacity-60 rounded-full transition-all duration-300 uppercase shadow-lg hover:shadow-secondary/30 disabled:bg-black/5'
            disabled={loading}
          >
            {loading ? <SyncLoader color='#fff' size={8} /> : "Upload"}
          </button>
        </form>
      </div>
    )
  );
}

export default UploadContainer;
