import React from "react";
import { Controller } from "react-hook-form";
import FormButton from "./FormButton";

function CategorieTextInput({ control, loading, errors }) {
  return (
    <div className='flex gap-2'>
      <Controller
        name={"categorie"}
        control={control}
        disabled={loading}
        render={({ field }) => (
          <input
            {...field}
            type={"text"}
            className='min-h-[20px] rounded-full w-full p-1 pl-3 placeholder:font-thin'
          />
        )}
      />
      <FormButton loading={loading} text={"add"} />
      <p
        className={`hidden ${
          errors && "block"
        } text-red-500 mt-1 font-light text-sm min-h-[20px] w-full`}
      >
        {errors?.categorie && errors?.categorie?.message}
      </p>
    </div>
  );
}

export default CategorieTextInput;
