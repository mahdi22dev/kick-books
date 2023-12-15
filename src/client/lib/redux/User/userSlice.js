import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isSideBarOpen: true,
    viewPDF: false,
    viewUpload: false,
    refetch: false,
  },
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
    refetchToggle: (state) => {
      state.refetch = !state.refetch;
    },
  },
});

export const { toggleSidebar, toggleviewPDF, toggleviewUpload, refetchToggle } =
  userSlice.actions;

export default userSlice.reducer;
