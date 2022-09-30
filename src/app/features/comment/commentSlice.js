import { createSlice } from "@reduxjs/toolkit";
import {
  createNewComment,
  getPostComment,
  editComment,
  deleteComment,
} from "../comment/commentAction";

const initialState = {
  loading: false,
  success: false, // for monitoring the creation process.
  commentSuccess: false,
  comment: null,
  postComment: null,
  editSuccess: false,
  editComment: null,
  deleteSucess: false,
  deletedComment: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    deletePostComment: (state, action) => {
      state.postComment = state.postComment.filter(
        (comment) => comment.id !== action.payload.id
      );
    },
  },
  extraReducers: {
    // get All likes of a post
    [createNewComment.pending]: (state) => {},
    [createNewComment.fulfilled]: (state, { payload }) => {
      if (payload.status === 200) {
        state.commentSuccess = true;
      }
      state.comment = payload;
    },

    // get Post Comment
    [getPostComment.pending]: (state) => {},
    [getPostComment.fulfilled]: (state, { payload }) => {
      if (payload.status === 200) {
        state.commentSuccess = true;
      }
      state.postComment = payload;
    },
    [getPostComment.rejected]: (state, { payload }) => {},

    // Edit a Comment
    [editComment.pending]: (state) => {},
    [editComment.fulfilled]: (state, { payload }) => {
      if (payload.status === 200) {
        state.editSuccess = true;
      }
      state.editComment = payload;
    },
    [editComment.rejected]: (state, { payload }) => {},

    // Delete a Comment
    [deleteComment.pending]: (state) => {},
    [deleteComment.fulfilled]: (state, { payload }) => {
      if (payload.status === 200) {
        state.deleteSucess = true;
      }
      state.deletedComment = payload;
    },
    [deleteComment.rejected]: (state, { payload }) => {},
  },
});

export const { deletePostComment } = commentSlice.actions;

export default commentSlice.reducer;
