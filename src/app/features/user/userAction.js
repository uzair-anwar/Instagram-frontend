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
