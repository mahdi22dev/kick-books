import React, { useEffect, useState } from "react";
import pdf from "./1.pdf";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout/lib";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function SingleFileViewr() {
  const workerUrl = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;
  const plugin = defaultLayoutPlugin();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const lastPage = localStorage.getItem("lastPage");
    if (lastPage) {
      setPageNumber(parseInt(lastPage, 10));
    }
  }, []);

  const onNavigate = (page) => {
    localStorage.setItem("lastPage", page);
    setPageNumber(page);
  };
  return (
    <Worker workerUrl={workerUrl}>
      <Viewer
        fileUrl={pdf}
        renderError={(error) => console.log(error)}
        plugins={[plugin]}
      />
    </Worker>
  );
}

export default SingleFileViewr;
