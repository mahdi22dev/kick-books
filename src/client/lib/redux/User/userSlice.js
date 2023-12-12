import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { isSideBarOpen: true, viewPDF: false, viewUpload: false },
  reducers: {
    toggleSidebar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
    toggleviewPDF: (state) => {
      state.viewPDF = !state.viewPDF;
    },
    toggleviewUpload: (state) => {
      state.viewUpload = !state.viewUpload;
    },
  },
});

export const { toggleSidebar, toggleviewPDF, toggleviewUpload } =
  userSlice.actions;

export default userSlice.reducer;
