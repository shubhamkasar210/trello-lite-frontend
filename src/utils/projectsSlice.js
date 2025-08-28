import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    data: [],
  },
  reducers: {
    setProjects: (state, action) => {
      state.data = action.payload;
    },
    addProject: (state, action) => {
      state.data.push(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.data.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteProject: (state, action) => {
      state.data = state.data.filter((p) => p._id !== action.payload);
    },
  },
});

export const { setProjects, addProject, updateProject, deleteProject } =
  projectSlice.actions;

export default projectSlice.reducer;
