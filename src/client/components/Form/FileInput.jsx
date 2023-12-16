import React from "react";
import { Controller } from "react-hook-form";

function FileInput({ control, loading, setFile, file, setValue }) {
  return (
    <div className='flex items-center space-x-4'>
      <label className='inline-flex items-center px-4 py-2 bg-secondary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-secondary/50 active:bg-accent focus:outline-none focus:border-blue-700 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150'>
        <span>Choose a file</span>
        <Controller
          name={"file"}
          control={control}
          disabled={loading}
          render={({ field: { value, onChange, ...field } }) => (
            <input
              type={"file"}
              className='hidden'
              accept='application/pdf'
              {...field}
              onChange={(event) => {
                onChange(event.target.files[0]);
                setValue("file", event.target.files[0]);
                setFile(event.target.files[0]);
              }}
            />
          )}
        />
      </label>
    </div>
  );
}

export default FileInput;
