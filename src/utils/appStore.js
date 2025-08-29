import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectsSlice";
import taskReducer from "./tasksSlice";
import userReducer from "./usersSlice";

const appStore = configureStore({
  reducer: {
    projects: projectReducer,
    tasks: taskReducer,
    user: userReducer,
  },
});

export default appStore;
