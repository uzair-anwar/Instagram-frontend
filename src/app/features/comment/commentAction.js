import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createNewComment = createAsyncThunk(
  // action type string
  "comment/create",
  // callback function
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();
      const { body, postId } = arg;

      // make request to backend
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_API}/post/${postId}/createComment`,
        data: { body },
        headers: {
          Authorization: `Bearer ${user.userToken}`,
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

export const getPostComment = createAsyncThunk(
  "comment/getPostComment",
  async ({ postId }, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/post/${postId}/comments`,
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

export const editComment = createAsyncThunk(
  // action type string
  "commnt/editComment",
  // callback function
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();
      const { id, body, postId } = arg;

      // make request to backend
      const { data } = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_SERVER_API}/post/${postId}/${id}/edit`,
        data: { body },
        headers: {
          Authorization: `Bearer ${user.userToken}`,
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

export const deleteComment = createAsyncThunk(
  // action type string
  "comment/deleteComment",
  // callback function
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();
      const { id, postId } = arg;

      // make request to backend
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_SERVER_API}/post/${postId}/${id}/delete`,
        headers: {
          Authorization: `Bearer ${user.userToken}`,
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
