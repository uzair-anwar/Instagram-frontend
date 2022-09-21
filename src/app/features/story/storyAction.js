import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createUserStory = createAsyncThunk(
  // action type string
  "story/create",
  // callback function
  async (formData, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      // make request to backend
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_API}/story/create`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
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

export const getUserStories = createAsyncThunk(
  "story/getAllStories",
  async ({ userId }, { getState, rejectWithValue }) => {
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
        `${process.env.REACT_APP_SERVER_API}/story/${userId}`,
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
