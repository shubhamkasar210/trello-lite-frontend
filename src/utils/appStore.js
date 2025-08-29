import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectsSlice";
import taskReducer from "./tasksSlice";

const appStore = configureStore({
  reducer: {
    projects: projectReducer,
    tasks: taskReducer,
  },
});

export default appStore;
