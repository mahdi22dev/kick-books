import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SignIn() {
  let navigate = useNavigate();
  const [values, setValues] = useState({
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
      const data = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const response = await data.json();
      setMessage(response?.message);
      console.log(response);
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

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
  return (
    <div className='flex justify-center items-center w-full min-h-screen bg-[#242424] text-red-100'>
      <form
        action=''
        className='flex flex-col gap-6 bg-black p-5 w-1/3'
        onSubmit={(e) => {
          HandleSumbit(e);
        }}
      >
        {message && (
          <p className='text-red-500 mx-auto capitalize'>{message}</p>
        )}
        {error && <p className='text-red-500 mx-auto capitalize'>{error}</p>}
        <h3 className=' mx-auto'>
          {" "}
          Sign In To Manage Your <span>eBooks</span>
        </h3>
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
          Sign In
        </button>
        <div>
          You don't have an account? sign up from{" "}
          <Link className='text-red-500' to={`/sign-up`}>
            here
          </Link>
        </div>
      </form>
    </div>
  );
}
