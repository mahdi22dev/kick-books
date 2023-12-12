import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { isSideBarOpen: true },
  reducers: {
    toggleSidebar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar } = userSlice.actions;

export default userSlice.reducer;
