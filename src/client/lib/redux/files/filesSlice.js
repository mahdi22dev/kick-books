import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
  name: "files",
  initialState: {
    files: [],
    fileId: "",
    filePath: "",
  },
  reducers: {
    updateFiles: (state, actions) => {
      state.files = actions.payload;
    },
    updateFileId: (state, actions) => {
      state.fileId = actions.payload;
    },
    updateFilePath: (state, actions) => {
      state.filePath = actions.payload;
    },
    CategoriesFilter: (state, actions) => {},
  },
});

export const { updateFiles, updateFileId, updateFilePath } = filesSlice.actions;

export default filesSlice.reducer;
