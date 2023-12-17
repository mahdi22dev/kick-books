import React, { useState } from "react";
import UserUI from "../components/Books/UserUI";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../lib/redux/User/userSlice";
import Files from "../components/Files/Files";
import Categories from "../components/Books/Categories";

export default function Books() {
  const dispatch = useDispatch();
  const [newUsername, setNewUsername] = useState({ username: "MahdoDodo" });

  return (
    <main className='relative w-full min-h-screen'>
      <UserUI />
      <div className=' h-full w-full'>
        <Files />
      </div>
    </main>
  );
}
