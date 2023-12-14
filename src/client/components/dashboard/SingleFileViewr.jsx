import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "./test.pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { ToastError } from "../../lib/toast";
import { Await } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function SingleFileViewr() {
  const { fileId } = useSelector((state) => state.files);
  const [fileContent, setFileContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const canvasRef = useRef();
  const fetchFileContent = async () => {
    const url = "http://localhost:3000/user/get-file/" + fileId;
    try {
      setLoading(true);
      const data = await fetch(url);
      const response = await data.json();
      if (response.success && response.url) {
        console.log(response.url);
        setFileContent(response.url);
      } else {
        ToastError("failed to Load file");
      }
    } catch (error) {
      setError("there was an error please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFileContent();
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    console.log(numPages);
  }
  function HandleError(error) {
    console.log(error);
  }
  const handleChange = (event) => {
    setPageNumber(event.target.value);
  };

  return loading ? (
    <div className='w-full min-h-[80vh] flex justify-center items-center bg-inherit'>
      <SyncLoader color='#48ccbc' size={16} />
    </div>
  ) : (
    <>
      {error && <p className='text-center text-primary'>{error}</p>}
      <Document
        file={fileContent}
        error={HandleError}
        onLoadError={HandleError}
        onLoadSuccess={onDocumentLoadSuccess}
        className={
          "w-[80%] mx-auto overflow-auto max-h-[90vh] min-h-[90vh] relative"
        }
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            className={"text-center mx-auto"}
            scale={1.5}
            canvasRef={(canvas) => {
              if (canvas) {
                canvas.style.marginInline = "auto";
              }

              canvasRef.current = canvas;
            }}
          />
        ))}
      </Document>
      {/* <div className='fixed bottom-16 left-48 flex border-primary border-4 bg-black/50 justify-center items-center gap-2 p-1 text-text'>
        <input
          type='text'
          placeholder={pageNumber}
          value={pageNumber}
          onChange={handleChange}
          className='rounded-full w-12 h-12 min-h-0 p-3 text-white bg-black/50 placeholder:text-white'
        />
        <label>{numPages}</label>
      </div> */}
    </>
  );
}

export default SingleFileViewr;
