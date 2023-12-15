import React, { useState } from "react";
import UserUI from "../components/dashboard/UserUI";
import SideNav from "../components/dashboard/SideNav";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../lib/redux/User/userSlice";
import Files from "../components/Files/Files";
export default function Dashboard() {
  const dispatch = useDispatch();
  const [newUsername, setNewUsername] = useState({ username: "MahdoDodo" });

  const HandleSumbit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch("/user/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUsername),
      });
      const response = await data.json();
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleToggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <main className='relative w-full min-h-screen'>
      <UserUI />
      {/* <TfiArrowCircleRight
        className='text-[30px] text-primary absolute top-[72px] left-3 cursor-pointer duration-300 hover:text-opacity-50'
        onClick={handleToggle}
      /> */}
      <div className='flex h-full w-full'>
        <Files />
      </div>
    </main>
  );
}
