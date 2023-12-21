import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFiles } from "../../lib/redux/files/filesSlice";
import SingleFile from "./SingleFile";
import Categories from "../Books/Categories";
import { ToastError } from "../../lib/toast";
import UploadController from "../Upload/UploadController";
import LoadingUi from "../LoadingUi";
import LoadingButton from "../Form/LoadingButton";

let pagination = 0;

function Files() {
  const { files, filter } = useSelector((state) => state.files);
  const { refetch } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const getFiles = async (filter) => {
    dispatch(updateFiles([]));
    const url = `/api/v1/user/get-files/q/${filter ?? "ALL"}/p/${pagination}`;
    try {
      setError(null);
      setLoading(true);
      const data = await fetch(url);
      const response = await data.json();
      if (response.success) {
        console.log(response);
        dispatch(updateFiles(response?.files));
        if (response?.files?.length < 6) {
          setViewMore(false);
        }
      }

      if (!response.success) {
        setError(response.error);
        setViewMore(false);
      }
    } catch (error) {
      ToastError("Can't get files right now");
    } finally {
      setLoading(false);
    }
  };

  const getFilesPagination = async (filter) => {
    pagination = pagination + 1;
    const url = `/api/v1/user/get-files/q/${filter ?? "ALL"}/p/${pagination}`;
    try {
      setError(null);
      setLoadingMore(true);
      const data = await fetch(url);
      const response = await data.json();
      if (response.success) {
        const PaginationDataMerge = files.concat(...response?.files);
        dispatch(updateFiles(PaginationDataMerge));
      }
      if (!response.success || response?.files?.length === 0) {
        setViewMore(false);
      }
    } catch (error) {
      console.log(error.message);
      ToastError("Can't get files right now");
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    getFiles(filter);
    setViewMore(true);
  }, [refetch, filter]);

  return (
    <>
      <Categories />
      <div className='p-5 w-full h-full'>
        {loading ? (
          <LoadingUi />
        ) : files.length === 0 ? (
          filter.toUpperCase() == "ALL" ? (
            <UploadController />
          ) : (
            <div className='w-full min-h-[80vh] flex justify-center items-center flex-col gap-3'>
              <p>
                You don't have any Books in{" "}
                <span className='text-primary'> {filter} </span>categorie
              </p>
              <p>
                to add book to this categorie click the 3 dots in book and click
                move to
              </p>
            </div>
          )
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto relative pb-10'>
            {files?.map((file) => {
              return <SingleFile key={file.id} file={file} />;
            })}
            <div className='h-5'></div>
            {viewMore && (
              <LoadingButton
                loading={loadingMore}
                text={"Load More"}
                customclass={"absolute bottom-0 left-[45%] max-w-[200px] mb-5"}
                onClick={() => getFilesPagination(filter)}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Files;
