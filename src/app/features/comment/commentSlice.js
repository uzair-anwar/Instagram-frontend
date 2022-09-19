import { createSlice } from "@reduxjs/toolkit";
import {
  createNewComment,
  getPostComment,
  editComment,
} from "../comment/commentAction";

const initialState = {
  loading: false,
  success: false, // for monitoring the creation process.
  commentSuccess: false,
  comment: null,
  postComment: null,
  editSuccess: false,
  editComment: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    // get All likes of a post
    [createNewComment.pending]: (state) => {},
    [createNewComment.fulfilled]: (state, { payload }) => {
      if (payload.status == 200) {
        state.commentSuccess = true;
      }
      state.comment = payload;
    },

    // get Post Comment
    [getPostComment.pending]: (state) => {},
    [getPostComment.fulfilled]: (state, { payload }) => {
      if (payload.status == 200) {
        state.commentSuccess = true;
        state.editSuccess = false;
      }
      state.postComment = payload;
    },
    [getPostComment.rejected]: (state, { payload }) => {},

    // get Post Comment
    [editComment.pending]: (state) => {},
    [editComment.fulfilled]: (state, { payload }) => {
      if (payload.status == 200) {
        state.editSuccess = true;
      }
      state.editComment = payload;
    },
    [editComment.rejected]: (state, { payload }) => {},
  },
});

export default commentSlice.reducer;
