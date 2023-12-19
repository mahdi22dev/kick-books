import React from "react";
import { SyncLoader } from "react-spinners";

function LoadingUi() {
  return (
    <div className='w-full min-h-[80vh] flex justify-center items-center'>
      <SyncLoader color='#48ccbc' size={16} />
    </div>
  );
}

export default LoadingUi;
