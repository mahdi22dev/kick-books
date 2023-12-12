import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "./2.pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function SingleFileViewr() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const canvasRef = useRef();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  function HandleError(error) {
    console.log(error);
  }
  const handleChange = (event) => {
    setPageNumber(event.target.value);
  };

  return (
    <>
      <Document
        file={pdf}
        error={HandleError}
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
      <div className='fixed bottom-16 left-48 flex border-primary border-4 bg-black/50 justify-center items-center gap-2 p-1 text-text'>
        <input
          type='text'
          placeholder={pageNumber}
          value={pageNumber}
          onChange={handleChange}
          className='rounded-full w-12 h-12 min-h-0 p-3 text-white bg-black/50 placeholder:text-white'
        />
        <label>{numPages}</label>
      </div>
    </>
  );
}

export default SingleFileViewr;
