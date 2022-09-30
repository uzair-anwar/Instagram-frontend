import { createSlice } from "@reduxjs/toolkit";
import {
  createNewPost,
  deletePost,
  editPost,
  getAllPost,
  doLike,
  getAllLikes,
} from "./postAction";

const initialState = {
  loading: false,
  posts: null, // for post object {}
  createPost: null,
  likes: null,
  likeSuccess: false,
  allLikes: null,
  deleteResult: null,
  deleteSuccess: false,
  edit: null,
  editSuccess: false,
  error: null,
  success: false, // for monitoring the creation process.
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removePost: (state) => {
      state.loading = false;
      state.posts = null;
      state.error = null;
    },
    deleteSinglePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.deleteResult = null;
    },
    removeEdit: (state) => {
      state.edit = null;
    },
  },
  extraReducers: {
    //create Post
    [createNewPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createNewPost.fulfilled]: (state, { payload }) => {
      if (payload.status === 201) {
        state.loading = false;
        state.success = true;
      }
      state.createPost = payload;
    },
    [createNewPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //Delete Post
    [deletePost.pending]: (state) => {
      state.deleteSuccess = false;
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      if (payload.status === 200) {
        state.deleteSuccess = true;
      }

      state.deleteResult = payload;
    },
    [deletePost.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    // getAllPost
    [getAllPost.pending]: (state) => {},
    [getAllPost.fulfilled]: (state, { payload }) => {
      state.editSuccess = false;
      state.deleteSuccess = false;
      state.deleteResult = null;
      state.posts = payload;
      state.success = false;
    },
    [getAllPost.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    // like a post
    [doLike.pending]: (state) => {
      state.likeSuccess = false;
    },
    [doLike.fulfilled]: (state, { payload }) => {
      state.likeSuccess = true;
      state.likes = payload;
    },
    [doLike.rejected]: (state, { payload }) => {},

    // get All likes of a post
    [getAllLikes.pending]: (state) => {},
    [getAllLikes.fulfilled]: (state, { payload }) => {
      state.allLikes = payload;
    },
    [getAllLikes.rejected]: (state, { payload }) => {},

    // edited a post
    [editPost.pending]: (state) => {},
    [editPost.fulfilled]: (state, { payload }) => {
      if (payload.status === 200) {
        state.editSuccess = true;
      }
      state.edit = payload;
    },
    [editPost.rejected]: (state, { payload }) => {},
  },
});

export const { removePost, deleteSinglePost, removeEdit } = postSlice.actions;
export default postSlice.reducer;
