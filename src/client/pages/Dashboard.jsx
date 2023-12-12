import React, { useEffect, useState } from "react";
import LogOut from "../components/auth/LogOut";
import UserUI from "../components/dashboard/UserUI";
import SideNav from "../components/dashboard/SideNav";

export default function Dashboard() {
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

  return (
    <main className='relative'>
      <UserUI />
      {/* side navbar */}
      <SideNav />
    </main>
  );
}
