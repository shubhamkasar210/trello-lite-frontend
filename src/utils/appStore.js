import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectsSlice";

const appStore = configureStore({
  reducer: {
    projects: projectReducer,
  },
});

export default appStore;
