import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const createNewPost = createAsyncThunk(
  // action type string
  "post/create",
  // callback function
  async (formData, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // make request to backend
      const { data } = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_SERVER_API}/post/create`,
        data: formData,
        headers: {
          Authorization: `Bearer ${user.userToken}`,
          "Content-Type": "multipart/form-data",
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

export const deletePost = createAsyncThunk(
  // action type string
  "post/delete",
  // callback function
  async (id, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // make request to backend
      const { data } = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_SERVER_API}/post/${id}`,
        headers: {
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

export const editPost = createAsyncThunk(
  // action type string
  "post/editPost",
  // callback function
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();
      const { caption, id } = arg;

      // make request to backend
      const { data } = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_SERVER_API}/post/edit/${id}`,
        data: { caption },
        headers: {
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

export const getAllPost = createAsyncThunk(
  "post/getAllPosts",
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
        `${process.env.REACT_APP_SERVER_API}/post/allPosts`,
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
export const doLike = createAsyncThunk(
  "post/doLike",
  async (postId, { getState, rejectWithValue }) => {
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
        `${process.env.REACT_APP_SERVER_API}/post/${postId}/like`,
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

export const getAllLikes = createAsyncThunk(
  "post/getAllLikes",
  async (postId, { getState, rejectWithValue }) => {
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
        `${process.env.REACT_APP_SERVER_API}/post/likes`,
        config
      );

      const result = data.result.reduce((prev, curr) => {
        return { ...prev, [curr.postId]: curr.likeCount };
      }, {});
      return result;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
