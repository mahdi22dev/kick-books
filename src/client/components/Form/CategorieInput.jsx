import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CetegorieSchema } from "../../lib/vidationSchema";
import { ToastError, ToastMessage } from "../../lib/toast";
import CategorieTextInput from "./CategorieTextInput";
import { CategorierefetchToggle } from "../../lib/redux/User/userSlice";
import { useDispatch } from "react-redux";

function CategorieInput() {
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState(false);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(CetegorieSchema) });

  const onSumbit = async (inputValue) => {
    setLoading(true);
    try {
      const data = await fetch("/api/v1/user/categorie/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      });
      const response = await data.json();
      if (response?.success) {
        ToastMessage("Categorie Added Successfly");
        dispatch(CategorierefetchToggle());
      }
      if (!response?.success) {
        ToastError("Error accur when trying to add the categorie");
      }
    } catch (error) {
      console.log(error.message);
      ToastError("there was an error please try again later herr1");
    } finally {
      setAdd(false);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSumbit)}
      className='flex justify-center items-center'
    >
      {!add && (
        <div
          className='cursor-pointer text-accent hover:text-accent/50 transition-all duration-300'
          onClick={() => setAdd(!add)}
        >
          Add New Categorie
        </div>
      )}
      {add && (
        <CategorieTextInput
          loading={loading}
          errors={errors}
          control={control}
        />
      )}
    </form>
  );
}

export default CategorieInput;
