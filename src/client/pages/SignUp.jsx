import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { SingUpschema } from "../../lib/vidationSchema";

export default function SignUp() {
  const navigate = Navigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SingUpschema) });

  const onSumbit = async (values) => {
    setMessage("");
    setError("");
    try {
      const data = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const response = await data.json();
      if (response?.success) {
        setTimeout(() => {
          setMessage("redirecting...");
        }, 500);
        setTimeout(() => {
          return navigate("/user/dashboard");
        }, 1500);
      }
      setMessage(response?.message);
    } catch (error) {
      setError("there was an error please try again later");
    }
  };

  return (
    <div className='flex justify-center items-center w-full min-h-screen bg-[#242424] text-red-100'>
      <form
        className='flex flex-col gap-3 bg-black p-5 w-1/3'
        onSubmit={handleSubmit(onSumbit)}
      >
        <label>username</label>
        <Controller
          name={"username"}
          control={control}
          render={({ field }) => <input {...field} type='text' />}
        />
        <p className='text-red-500 mt-1 font-light text-sm min-h-[20px]'>
          {errors.username && errors.username.message}
        </p>

        <label>email</label>
        <Controller
          name={"email"}
          control={control}
          render={({ field }) => <input {...field} type='email' />}
        />
        <p className='text-red-500 mt-1 font-light text-sm min-h-[20px]'>
          {errors.email && errors.email.message}
        </p>

        <label>password</label>
        <Controller
          name={"password"}
          control={control}
          render={({ field }) => <input {...field} type='passowrd' />}
        />
        <p className='text-red-500 mt-1 font-light text-sm min-h-[20px]'>
          {errors.password && errors.password.message}
        </p>
        <button
          type='submit'
          className='text-white bg-[#242424] p-2 hover:bg-opacity-80'
        >
          Sign Up
        </button>
        <div>
          You have an account? sign in from{" "}
          <Link className='text-red-500' to={`/`}>
            here
          </Link>
        </div>
      </form>
    </div>
  );
}
