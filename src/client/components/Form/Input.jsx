import React from "react";

function Input({ type, ...field }) {
  return <input {...field} type={type} />;
}

export default Input;
