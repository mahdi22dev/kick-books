import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isSideBarOpen: true,
    viewPDF: false,
    viewUpload: false,
    refetch: false,
    DeleteCategorie: false,
    ConfirmDelete: false,
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
    ToggleDelete: (state) => {
      state.DeleteCategorie = !state.DeleteCategorie;
    },
    ToggleConfirmDelete: (state) => {
      state.ConfirmDelete = true;
    },
    CloseConfirmDelete: (state) => {
      state.ConfirmDelete = false;
    },
  },
});

export const {
  toggleSidebar,
  toggleviewPDF,
  toggleviewUpload,
  refetchToggle,
  ToggleDelete,
  ToggleConfirmDelete,
  CloseConfirmDelete,
} = userSlice.actions;

export default userSlice.reducer;
