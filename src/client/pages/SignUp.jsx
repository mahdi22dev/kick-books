import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BackToHome from "../components/Home/BackToHome";
import TextHeader from "../components/auth/TextHeader";
import MessagesUI from "../components/auth/MessagesUI";
import { SingUpschema } from "../lib/vidationSchema";
import TextInput from "../components/Form/TextInput";
import FormButton from "../components/Form/FormButton";
import FormRedirect from "../components/Form/FormRedirect";

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
      const data = await fetch("/api/v1/auth/signup", {
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
          return navigate("/user/Books");
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
        <TextInput
          errors={errors}
          Inputype={"username"}
          loading={loading}
          control={control}
        />
        {/* email */}
        <TextInput
          errors={errors}
          Inputype={"email"}
          loading={loading}
          control={control}
        />
        {/* password */}
        <TextInput
          errors={errors}
          Inputype={"password"}
          loading={loading}
          control={control}
        />
        {/* Confirm password */}
        <TextInput
          errors={errors}
          Inputype={"confirmPassword"}
          loading={loading}
          control={control}
        />
        <FormButton loading={loading} text={"Sign Up"} />
        <FormRedirect text={"sign in"} path={"/sign-in"} />
        {/* display errors and messages */}
        <MessagesUI error={error} message={message} />
      </form>
    </main>
  );
}
