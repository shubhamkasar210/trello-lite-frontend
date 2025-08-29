import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.data = action.payload;
    },
    addTask: (state, action) => {
      state.data.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.data.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.data = state.data.filter((t) => t._id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
