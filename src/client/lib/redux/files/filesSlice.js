import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
  name: "files",
  initialState: {
    files: [],
  },
  reducers: {
    updateFiles: (state, actions) => {
      state.files = actions.payload;
    },
    CategoriesFilter: (state, actions) => {},
  },
});

// Action creators are generated for each case reducer function
export const { updateFiles } = filesSlice.actions;

export default filesSlice.reducer;
