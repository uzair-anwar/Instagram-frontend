import { createSlice } from "@reduxjs/toolkit";
import { createNewPost, getAllPost, doLike, getAllLikes } from "./postAction";

const initialState = {
  loading: false,
  posts: null, // for post object {}
  likes: null,
  likeSuccess: false,
  allLikes: null,
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
  },
  extraReducers: {
    //create Post
    [createNewPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createNewPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [createNewPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // getAllPost
    [getAllPost.pending]: (state) => {
      state.loading = true;
    },
    [getAllPost.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
    },
    [getAllPost.rejected]: (state, { payload }) => {
      state.loading = false;
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
  },
});

export const { removePost } = postSlice.actions;
export default postSlice.reducer;
