import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  // action type string
  "user/register",
  // callback function
  async (formData, { rejectWithValue }) => {
    try {
      // make request to backend
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_API}/auth/signup`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_API}/auth/login`,
        data: {
          email,
          password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      // store user's token in local storage
      localStorage.setItem("userToken", data.userToken);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/auth/getUser`,
        config
      );
      return data.result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const searchUsers = createAsyncThunk(
  "user/searchUsers",
  async (name, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/auth/${name}`,
        config
      );
      return data.result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getSearchedUserDetails = createAsyncThunk(
  "user/getSearchehUserDetails",
  async ({ searchedId }, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();
      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/auth/search/${searchedId}`,
        config
      );
      return data.result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const setFollow = createAsyncThunk(
  "user/follow",
  async ({ followId }, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/auth/follow/${followId}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getFollowings = createAsyncThunk(
  "user/getFollowing",
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/auth/getFollow`,
        config
      );
      return data.result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  // action type string
  "user/updateUser",
  // callback function
  async ({ name, username, isPrivate }, { getState, rejectWithValue }) => {
    try {
      // make request to backend
      const { user } = getState();
      const { data } = await axios({
        method: "put",
        url: `${process.env.REACT_APP_SERVER_API}/auth/update`,
        data: { name, username, isPrivate },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.userToken}`,
        },
      });
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updatePassword = createAsyncThunk(
  // action type string
  "user/updatePassword",
  // callback function
  async ({ oldPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      // make request to backend
      const { user } = getState();
      const { data } = await axios({
        method: "put",
        url: `${process.env.REACT_APP_SERVER_API}/auth/updatePassword`,
        data: { oldPassword, newPassword },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.userToken}`,
        },
      });
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const sendEmail = createAsyncThunk(
  // action type string
  "user/sendEmail",
  // callback function
  async ({ email }, { rejectWithValue }) => {
    try {
      // make request to backend
      const { data } = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_API}/auth/sendEmail`,
        data: { email },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addNewPassword = createAsyncThunk(
  // action type string
  "user/addNewPassword",
  // callback function
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log(email);
      // make request to backend
      const { data } = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_API}/auth/addPassword`,
        data: { email, password },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getFollowStatus = createAsyncThunk(
  "user/getFolloStatus",
  async ({ searchedId }, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/auth/getFollowStatus/${searchedId}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const sendRequest = createAsyncThunk(
  "user/request",
  async ({ requesterId }, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/auth/request/${requesterId}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getRequests = createAsyncThunk(
  "user/getRequests",
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/auth/getRequests`,
        config
      );
      return data.result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const rejectRequest = createAsyncThunk(
  "user/rejectRequest",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER_API}/auth/rejectRequest/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const acceptRequest = createAsyncThunk(
  "user/acceptRequest",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/auth/acceptRequest/${id}`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
