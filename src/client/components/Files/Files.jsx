import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleviewPDF } from "../../lib/redux/User/userSlice";
import { SyncLoader } from "react-spinners";
import { updateFileId, updateFiles } from "../../lib/redux/files/filesSlice";
import SingleFile from "./SingleFile";

function Files() {
  const { files } = useSelector((state) => state.files);
  const { refetch } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleViewrToggle = (id) => {
    dispatch(updateFileId(id));
    dispatch(toggleviewPDF());
  };

  const getFiles = async () => {
    // try {
    //   setLoading(true);
    //   const data = await fetch("/user/get-files");
    //   const response = await data.json();
    //   if (response) {
    //     dispatch(updateFiles(response?.files));
    //     console.log(files);
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
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
        <div className='grid grid-cols-3 gap-5'>
          {/* {files?.map((file) => {
            const decodedFileName = decodeURIComponent(file.fileName);
            return (
              <div
                key={file.id}
                className='bg-primary/60'
                onClick={() => {
                  handleViewrToggle(file.id);
                }}
              >
                <p>title: {decodedFileName}</p>
              </div>
            );
          })} */}
          <SingleFile />
        </div>
      )}
    </div>
  );
}

export default Files;
