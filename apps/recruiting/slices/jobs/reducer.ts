import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editMode: false,
  formMode: null,
};

const slice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setState: (state, action) => {
      state.editMode = action.payload.editMode;
      state.formMode = action.payload.formMode ? action.payload.formMode : null;
    },
    reset: (state) => {
      state.editMode = false;
      state.formMode = null;
    },
  },
});

export const jobActions = slice.actions;
export const jobReducer = slice.reducer;
