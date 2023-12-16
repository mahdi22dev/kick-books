import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { updateFiles } from "../../lib/redux/files/filesSlice";
import SingleFile from "./SingleFile";
import { toggleviewUpload } from "../../lib/redux/User/userSlice";
import Categories from "../Books/Categories";

function Files() {
  const { files } = useSelector((state) => state.files);
  const { refetch } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [filesData, setFilesData] = useState(files);
  const dispatch = useDispatch();

  const getFiles = async () => {
    try {
      setLoading(true);
      const data = await fetch("/api/v1/user/get-files");
      const response = await data.json();
      if (response) {
        dispatch(updateFiles(response?.files));
        setFilesData(files);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFiles();
    console.log(files);
  }, [refetch]);

  return (
    <>
      <Categories />
      <div className='p-5 w-full h-full'>
        {loading ? (
          <div className='w-full min-h-[80vh] flex justify-center items-center'>
            <SyncLoader color='#48ccbc' size={16} />
          </div>
        ) : files?.length === 0 ? (
          <div className='w-full min-h-[80vh] flex justify-center items-center flex-col gap-3'>
            <p>You don't have any Books</p>
            <p>Upload new book (pdf) </p>
            <button
              onClick={() => dispatch(toggleviewUpload())}
              className='text-white text-md p-2 bg-secondary hover:bg-opacity-60 rounded-full transition-all duration-300 uppercase shadow-lg hover:shadow-secondary/30 disabled:bg-black/5'
            >
              Upload
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto'>
            {files?.map((file) => {
              return <SingleFile key={file.id} file={file} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Files;
