import React from "react";
import { Controller } from "react-hook-form";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
function TextInput({ control, loading, errors, Inputype, defaultValue }) {
  function ReactIcon() {
    if (Inputype === "email") {
      return <MdOutlineAlternateEmail className='absolute top-[18px] left-4' />;
    } else if (Inputype === "password") {
      return <RiLockPasswordLine className='absolute top-[18px] left-4' />;
    } else {
      return <RiLockPasswordLine className='absolute top-[18px] left-4' />;
    }
  }

  return (
    <div className='relative w-full'>
      <ReactIcon />
      <Controller
        name={Inputype}
        control={control}
        defaultValue={defaultValue || ""}
        disabled={loading}
        render={({ field }) => (
          <input {...field} type={Inputype} placeholder={Inputype} />
        )}
      />
      <p className='text-red-500 mt-1 font-light text-sm min-h-[20px] w-full'>
        {errors?.Inputype && errors?.Inputype?.message}
      </p>
    </div>
  );
}

export default TextInput;
