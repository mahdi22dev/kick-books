import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout/lib";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { ToastError } from "../../lib/toast";
import { updateFilePath } from "../../lib/redux/files/filesSlice";

function SingleFileViewr() {
  const workerUrl = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;
  const plugin = defaultLayoutPlugin();
  const { fileId } = useSelector((state) => state.files);
  const dispath = useDispatch();
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFileContent = async () => {
    const url = "http://localhost:3000/api/v1/user/get-file/" + fileId;
    try {
      setLoading(true);
      const data = await fetch(url);
      const response = await data.json();
      if (response.success) {
        setFileName(response.fileName);
        setFileContent(response.url);
        dispath(updateFilePath(response.filePath));
      } else {
        ToastError(response.message);
      }
    } catch (error) {
      ToastError("there was an error please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFileContent();
  }, []);

  const onNavigate = (page) => {
    localStorage.setItem(`${fileName}_${fileId}_page`, page.currentPage);
  };

  return loading ? (
    <div className='w-full min-h-[80vh] flex justify-center items-center bg-inherit'>
      <SyncLoader color='#48ccbc' size={16} />
    </div>
  ) : (
    <Worker workerUrl={workerUrl}>
      <Viewer
        fileUrl={fileContent}
        renderError={(error) => {
          console.log(error);
          ToastError(error.message);
        }}
        plugins={[plugin]}
        initialPage={localStorage.getItem(`${fileName}_${fileId}_page`) || 0}
        onPageChange={onNavigate}
      />
    </Worker>
  );
}

export default SingleFileViewr;
