import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
  name: "files",
  initialState: {
    files: [],
    fileId: "",
    filePath: "",
    filter: "all",
    categorieObj: {},
    categories: [],
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
    UpdateFilter: (state, actions) => {
      state.filter = actions.payload;
    },
    UpdateCategories: (state, actions) => {
      state.categories = actions.payload;
    },
    UpdateCategorieObj: (state, actions) => {
      state.categorieObj = actions.payload;
    },
  },
});

export const {
  updateFiles,
  updateFileId,
  updateFilePath,
  UpdateFilter,
  UpdateCategories,
  UpdateCategorieObj,
} = filesSlice.actions;

export default filesSlice.reducer;
