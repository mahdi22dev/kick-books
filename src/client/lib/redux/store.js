import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./User/userSlice";
import filesSlice from "./files/filesSlice";

const store = configureStore({
  reducer: { files: filesSlice, user: userSlice },
});

export default store;
