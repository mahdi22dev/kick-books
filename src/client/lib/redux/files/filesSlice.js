import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
  name: "cart",
  initialState: {
    files: [{ id: 1, filesName: "text.txt" }],
  },
  reducers: {
    CategoriesFilter: (state, actions) => {},
  },
});

// Action creators are generated for each case reducer function
export const {} = filesSlice.actions;

export default filesSlice.reducer;
