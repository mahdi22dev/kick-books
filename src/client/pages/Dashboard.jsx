import React, { useEffect, useState } from "react";

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
    <main className=''>
      <h2>Dashboard</h2>
      <button
        className='text-white bg-red-200 p-2 hover:bg-opacity-80'
        onClick={(e) => HandleSumbit(e)}
      >
        change username
      </button>
    </main>
  );
}
