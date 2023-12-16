import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
  name: "files",
  initialState: {
    files: [],
    fileId: "",
    filePath: "",
    filter: "all",
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
    categoryFilter: (state, actions) => {
      console.log(actions.payload);
      console.log(state.files);
      const filtredFiles = state.files.filter(
        (file) => file.category === actions.payload
      );
      state.files = filtredFiles;
    },
  },
});

export const { updateFiles, updateFileId, updateFilePath, categoryFilter } =
  filesSlice.actions;

export default filesSlice.reducer;
