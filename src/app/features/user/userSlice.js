import { createSlice } from "@reduxjs/toolkit";
import {
  getUserDetails,
  registerUser,
  userLogin,
  searchUsers,
  setFollow,
  getFollowings,
} from "./userAction";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null, // for user object {}
  userToken: userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
  searchedUsers: null,
  searchSuccess: false,
  followSuccess: false,
  followings: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken"); // deletes token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: {
    //login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      state.userToken = payload.userToken;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      state.userToken = payload.userToken;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // getUserDetails
    [getUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.searchSuccess = false;
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    // search User
    [searchUsers.pending]: (state) => {
      state.loading = true;
    },
    [searchUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.searchSuccess = true;
      state.searchedUsers = payload;
    },
    [searchUsers.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    [setFollow.pending]: (state) => {
      state.loading = true;
    },
    [setFollow.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.followSuccess = true;
    },
    [setFollow.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    //gry following
    [getFollowings.pending]: (state) => {
      state.loading = true;
    },
    [getFollowings.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.followings = payload;
    },
    [getFollowings.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
