import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isSideBarOpen: true,
    viewPDF: false,
    viewUpload: false,
    refetch: false,
    ScaleAnimation: false,
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
    StartAnimation: (state) => {
      state.ScaleAnimation = true;
    },
    CloseAnimation: (state) => {
      state.ScaleAnimation = false;
    },
  },
});

export const {
  toggleSidebar,
  toggleviewPDF,
  toggleviewUpload,
  refetchToggle,
  StartAnimation,
  CloseAnimation,
} = userSlice.actions;

export default userSlice.reducer;
