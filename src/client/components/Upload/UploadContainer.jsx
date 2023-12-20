import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  refetchToggle,
  toggleviewUpload,
} from "../../lib/redux/User/userSlice";
import { IoMdClose } from "react-icons/io";
import { ToastError, ToastMessage } from "../../lib/toast";
import { UploadSchema } from "../../lib/vidationSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FileInput from "../Form/FileInput";
import LoadingButton from "../Form/LoadingButton";
import Select from "react-select";
import { convertToSelectOptions } from "../../lib/utils";

function UploadContainer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { viewUpload } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.files);
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    setError,
  } = useForm({ resolver: yupResolver(UploadSchema) });

  const handleViewrToggle = () => {
    setFile(null);
    reset();
    setSelectedOption(null);
    dispatch(toggleviewUpload());
  };

  const handleFileSumbit = async (fileData) => {
    const PDF = fileData.file;
    const categorie = selectedOption.label || "Art";
    if (PDF.type != "application/pdf") {
      setError("file", {
        type: "filetype",
        message: "Only PDFs are valid.",
      });
      return;
    } else if (PDF.size >= 20 * 1024 * 1024) {
      setError("file", {
        type: "filesize",
        message: "20 MB is the maximum allowed file size.",
      });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      console.log(categorie);
      formData.append("file", PDF);
      formData.append("categorie", categorie);

      const data = await fetch("/api/v1/user/upload", {
        method: "POST",
        body: formData,
      });

      const response = await data.json();
      if (response.success) {
        ToastMessage(response?.message);
        handleViewrToggle();
        dispatch(refetchToggle());
        reset();
        setFile(null);
      }
    } catch (error) {
      console.log(error.message);
      ToastError("There's an Error Please try Again Later");
    } finally {
      setLoading(false);
    }
  };

  const options = convertToSelectOptions(categories);
  const handleDropdownChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  return (
    viewUpload && (
      <>
        <div className='flex flex-col justify-center items-center absolute top-0 right-0 left-0 -bottom-16 min-h-screen bg-black/50 z-[100] px-10 py-7 '>
          {" "}
          <div className='relative flex justify-center items-center flex-col gap-1 bg-primary min-h-[300px] min-w-[80%] md:min-w-[500px] p-4'>
            {" "}
            <IoMdClose
              onClick={handleViewrToggle}
              className='text-[25px] text-secondary hover:text-secondary/60 transition-all duration-300 cursor-pointer absolute top-2 left-2'
            />
            <div className='flex flex-col justify-center items-center gap-2 text-sm'>
              <p>Select a Categorie</p>
              <Select
                onChange={handleDropdownChange}
                options={options}
                placeholder='Select...'
              />
            </div>
            <form
              onSubmit={handleSubmit(handleFileSumbit)}
              className='relative flex justify-center items-center flex-col gap-10 p-4'
            >
              <FileInput
                control={control}
                loading={loading}
                setFile={setFile}
                file={file}
                setValue={setValue}
              />
              {errors.file && ToastError(errors.file.message)}
              {file && (
                <div className='max-w-xs whitespace-normal'>{file?.name}</div>
              )}

              <LoadingButton loading={loading} text={"Upload"} />
            </form>
          </div>
        </div>
      </>
    )
  );
}

export default UploadContainer;
