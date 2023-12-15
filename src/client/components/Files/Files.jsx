import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { updateFiles } from "../../lib/redux/files/filesSlice";
import SingleFile from "./SingleFile";

function Files() {
  const { files } = useSelector((state) => state.files);
  const { refetch } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getFiles = async () => {
    try {
      setLoading(true);
      const data = await fetch("/user/get-files");
      const response = await data.json();
      if (response) {
        dispatch(updateFiles(response?.files));
        console.log(files);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFiles();
  }, [refetch]);
  return (
    <div className='p-5 w-full h-full'>
      {loading ? (
        <div className='w-full min-h-[80vh] flex justify-center items-center'>
          <SyncLoader color='#48ccbc' size={16} />
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto'>
          {files?.map((file) => {
            return <SingleFile key={file.id} file={file} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Files;
