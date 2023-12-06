import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const HandleSumbit = async (e) => {
    setMessage("");
    setError("");
    e.preventDefault();
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

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  return (
    <div className='flex justify-center items-center w-full min-h-screen bg-[#242424] text-red-100'>
      <form
        action=''
        className='flex flex-col gap-10 bg-black p-5 w-1/3'
        onSubmit={(e) => {
          HandleSumbit(e);
        }}
      >
        {message && (
          <p className='text-red-500 mx-auto capitalize'>{message}</p>
        )}
        {error && <p className='text-red-500 mx-auto capitalize'>{error}</p>}
        <label>username</label>
        <input
          onChange={(e) => {
            onChange(e);
          }}
          name='username'
          value={values["username"]}
          type='username'
        />
        <label>email</label>
        <input
          onChange={(e) => {
            onChange(e);
          }}
          name='email'
          value={values["email"]}
          type='email'
        />
        <label>password</label>
        <input
          onChange={(e) => {
            onChange(e);
          }}
          name='password'
          value={values["password"]}
          type='password'
        />
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
