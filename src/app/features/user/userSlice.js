import { createSlice } from "@reduxjs/toolkit";
import {
  getUserDetails,
  registerUser,
  userLogin,
  searchUsers,
  getSearchedUserDetails,
  setFollow,
  getFollowings,
  updateUser,
  updatePassword,
  getFollowStatus,
  sendRequest,
  getRequests,
  rejectRequest,
  acceptRequest,
  sendEmail,
  addNewPassword,
} from "./userAction";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  signedUpStatus: null,
  userInfo: null, // for user object {}
  userToken: userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
  searchedUsers: null,
  searchedUserDetails: null,
  searchSuccess: false,
  followSuccess: false,
  followings: null,
  updateSuccess: false,
  updateInfo: null,
  followStatus: null,
  requestStatus: null,
  requests: null,
  rejectStatus: null,
  acceptStatus: null,
  updatePasswordSuccess: false,
  updatePasswordStatus: null,
  emailStatus: null,
  newPasswordSuccess: false,
  newPasswordStatus: null,
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
    signedUp: (state) => {
      state.success = false;
    },
    edited: (state) => {
      state.updateSuccess = false;
    },
    deleteRequest: (state, action) => {
      state.requests = state.requests.filter(
        (request) => request.id !== action.payload
      );
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
      if (payload.status == 201) {
        state.success = true; // registration successful
        state.userToken = payload.userToken;
      }
      state.loading = false;
      state.signedUpStatus = payload;
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
      state.searchedUserDetails = null;
      state.updateSuccess = false;
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

    // search User
    [getSearchedUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [getSearchedUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.searchedUserDetails = payload;
    },
    [getSearchedUserDetails.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    // follow user
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

    //get following
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

    //get following
    [getFollowStatus.pending]: (state) => {
      state.loading = true;
    },
    [getFollowStatus.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.followStatus = payload;
    },
    [getFollowStatus.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    //Update User
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      if (payload.status == 200) {
        state.updateSuccess = true;
      }
      state.updateInfo = payload;
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    //Update user password
    [updatePassword.pending]: (state) => {
      state.loading = true;
    },
    [updatePassword.fulfilled]: (state, { payload }) => {
      if (payload.status == 200) {
        state.updatePasswordSuccess = true;
      }
      state.updatePasswordStatus = payload;
    },
    [updatePassword.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    //Send Email
    [sendEmail.pending]: (state) => {
      state.loading = true;
    },
    [sendEmail.fulfilled]: (state, { payload }) => {
      state.emailStatus = payload;
    },
    [sendEmail.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    //Update user password
    [addNewPassword.pending]: (state) => {
      state.loading = true;
    },
    [addNewPassword.fulfilled]: (state, { payload }) => {
      if (payload.status == 200) {
        state.newPasswordSuccess = true;
      }
      state.newPasswordStatus = payload;
    },
    [addNewPassword.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    // Request user for follow
    [sendRequest.pending]: (state) => {
      state.loading = true;
    },
    [sendRequest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.requestStatus = true;
    },
    [sendRequest.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    // get request of user
    [getRequests.pending]: (state) => {
      state.loading = true;
    },
    [getRequests.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.requests = payload;
    },
    [getRequests.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    // reject request of requester
    [rejectRequest.pending]: (state) => {
      state.loading = true;
    },
    [rejectRequest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.rejectStatus = payload;
    },
    [rejectRequest.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    // accept request of requester
    [acceptRequest.pending]: (state) => {
      state.loading = true;
    },
    [acceptRequest.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.acceptStatus = payload;
    },
    [acceptRequest.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { signedUp, logout, edited, deleteRequest } = userSlice.actions;
export default userSlice.reducer;
