import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignInschema } from "../../lib/vidationSchema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdErrorOutline } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";

export default function SignIn() {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SignInschema) });

  const onSumbit = async (inputValue) => {
    setMessage("");
    setError("");
    try {
      const data = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      });
      const response = await data.json();
      setMessage(response?.message);
      if (response?.success) {
        const id = response?.user?.id;
        localStorage.setItem("userId", id);
        setTimeout(() => {
          setMessage("redirecting...");
        }, 500);
        setTimeout(() => {
          return navigate("/user/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.log(error.message);
      setError("there was an error please try again later");
    }
  };

  return (
    <div className='flex justify-center items-center w-full min-h-screen bg-[#242424] text-red-100'>
      <form
        className='flex flex-col gap-3 bg-black p-5 w-1/3'
        onSubmit={handleSubmit(onSumbit)}
      >
        <h3 className=' mx-auto'>
          Sign In To Manage Your <span>eBooks</span>
        </h3>
        {/* email */}
        <label>email</label>
        <Controller
          name={"email"}
          control={control}
          render={({ field }) => <input {...field} type='email' />}
        />
        <p className='text-red-500 mt-1 font-light text-sm min-h-[20px]'>
          {errors.email && errors.email.message}
        </p>

        {/* password */}
        <label>password</label>
        <Controller
          name={"password"}
          control={control}
          render={({ field }) => <input {...field} type={"password"} />}
        />

        <p className='text-red-500 mt-1 font-light text-sm min-h-[20px]'>
          {errors.password && errors.password.message}
        </p>

        <button
          type='submit'
          className='text-white bg-[#242424] p-2 hover:bg-opacity-80'
        >
          Sign In
        </button>

        <div>
          You don't have an account? sign up from{" "}
          <Link className='text-red-500' to={`/sign-up`}>
            here
          </Link>
        </div>

        {message && (
          <div className='flex justify-start items-center gap-2'>
            <IoCheckmarkSharp className='text-green-500' />
            <p className='text-green-500 capitalize'>{message}</p>
          </div>
        )}

        {error && (
          <div className='flex justify-start items-center gap-2'>
            <MdErrorOutline className='text-red-500' />
            <p className='text-red-500 capitalize'>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
}
