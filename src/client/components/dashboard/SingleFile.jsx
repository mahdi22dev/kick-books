import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import pdf from "../../assets/pdf/book1.pdf";

function SingleFile() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div>
      <Document file={pdf}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>{pageNumber}</p>
    </div>
  );
}

export default SingleFile;
