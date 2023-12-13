import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
  name: "files",
  initialState: {
    files: [],
    fileId: "6578dfd3135360380eca579e",
  },
  reducers: {
    updateFiles: (state, actions) => {
      state.files = actions.payload;
    },
    updateFileId: (state, actions) => {
      state.fileId = actions.payload;
    },
    CategoriesFilter: (state, actions) => {},
  },
});

// Action creators are generated for each case reducer function
export const { updateFiles, updateFileId } = filesSlice.actions;

export default filesSlice.reducer;
