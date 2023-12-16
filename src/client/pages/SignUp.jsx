import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { SyncLoader } from "react-spinners";
import { CiUser } from "react-icons/ci";
import BackToHome from "../components/Home/BackToHome";
import TextHeader from "../components/auth/TextHeader";
import MessagesUI from "../components/auth/MessagesUI";
import { SingUpschema } from "../lib/vidationSchema";

export default function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(SingUpschema) });

  const onSumbit = async (values) => {
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const data = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const response = await data.json();
      if (response?.success) {
        const userName = response?.user?.name;
        localStorage.setItem("userName", userName);

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
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <main className='flex flex-col justify-center items-center w-full min-h-screen'>
      <BackToHome />
      <TextHeader text={"REGISTER NEW ACCOUNT"} />

      <form
        className='flex flex-col gap-3 bg-black w-[90%] lg:w-2/3 xl:w-[35%] py-7 px-16 rounded-b-sm bg-primary/5'
        onSubmit={handleSubmit(onSumbit)}
      >
        {/* username */}
        <div className='relative w-full'>
          <CiUser className='absolute top-[18px] left-4' />
          <Controller
            name={"username"}
            control={control}
            disabled={loading}
            render={({ field }) => (
              <input {...field} type='text' placeholder='username' />
            )}
          />
          <p className='text-red-500 mt-1 font-light text-sm min-h-[20px] w-full'>
            {errors.username && errors.username.message}
          </p>
        </div>
        {/* email */}
        <div className='relative w-full'>
          <MdOutlineAlternateEmail className='absolute top-[18px] left-4' />
          <Controller
            name={"email"}
            disabled={loading}
            control={control}
            render={({ field }) => (
              <input {...field} type='email' placeholder='email' />
            )}
          />
          <p className='text-red-500 mt-1 font-light text-sm min-h-[20px] w-full'>
            {errors.email && errors.email.message}
          </p>
        </div>

        {/* password */}
        <div className='relative w-full '>
          <RiLockPasswordLine className='absolute top-[18px] left-4' />
          <Controller
            name={"password"}
            disabled={loading}
            control={control}
            render={({ field }) => (
              <input {...field} type={"password"} placeholder='password' />
            )}
          />
        </div>
        <p className='text-red-500 mt-1 font-light text-sm min-h-[20px]'>
          {errors.password && errors.password.message}
        </p>
        {/* Confirm password */}
        <div className='relative w-full '>
          <RiLockPasswordLine className='absolute top-[18px] left-4' />
          <Controller
            name={"confirmPassword"}
            disabled={loading}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type={"password"}
                placeholder='confirm Password'
              />
            )}
          />
        </div>
        <p className='text-red-500 mt-1 font-light text-sm min-h-[20px]'>
          {errors.confirmPassword && errors.confirmPassword.message}
        </p>

        <button
          type='submit'
          className='text-white p-2 bg-primary hover:bg-opacity-60 rounded-full transition-all duration-300 uppercase shadow-lg hover:shadow-primary/30 disabled:bg-black/5'
          disabled={loading}
        >
          {loading ? <SyncLoader color='#fff' size={8} /> : " Sign Up"}
        </button>

        <div className='font-normal mt-2'>
          You Have Account Login from{" "}
          <Link
            className='text-secondary hover:text-secondary/60 transition-all duration-300'
            to={`/sign-in`}
          >
            here
          </Link>
        </div>

        {/* display errors and messages */}

        <MessagesUI error={error} message={message} />
      </form>
    </main>
  );
}
