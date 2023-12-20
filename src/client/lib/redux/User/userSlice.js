import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isSideBarOpen: true,
    viewPDF: false,
    viewUpload: false,
    refetch: false,
    refetchCategories: false,
    DeleteCategorie: false,
    ConfirmDelete: false,
    ConfirmFileDelete: false,
    mobileState: false,
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
    CategorierefetchToggle: (state) => {
      state.refetchCategories = !state.refetchCategories;
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
    ToggleFileConfirmDelete: (state) => {
      state.ConfirmFileDelete = true;
    },
    CloseFileConfirmDelete: (state) => {
      state.ConfirmFileDelete = false;
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
  CategorierefetchToggle,
  ToggleFileConfirmDelete,
  CloseFileConfirmDelete,
} = userSlice.actions;

export default userSlice.reducer;
