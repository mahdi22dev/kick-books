import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { isSideBarOpen: true, viewPDF: false },
  reducers: {
    toggleSidebar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
    toggleviewPDF: (state) => {
      state.viewPDF = !state.viewPDF;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar, toggleviewPDF } = userSlice.actions;

export default userSlice.reducer;
