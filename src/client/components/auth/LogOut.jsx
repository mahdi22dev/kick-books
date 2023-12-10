import React from "react";

const handleLogOut = async () => {
  try {
    const data = await fetch("/auth/logout");
    await data.json();
    console.log(data);
    // if (response?.success) {
    //   window.location.href = "/";
    // }
  } catch (error) {
    console.log(error.message);
  }
};

const LogOut = () => {
  return <button onClick={handleLogOut}>LogOut</button>;
};

export default LogOut;
