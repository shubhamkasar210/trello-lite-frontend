import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { addUser, removeUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
