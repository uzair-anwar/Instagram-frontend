import { createSlice } from "@reduxjs/toolkit";
import { createUserStory, getUserStories } from "./storyAction";

const initialState = {
  loading: false,
  story: null,
  storyGet: false,
  firstTime: true,
  storyMessage: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    removeStory: (state) => {
      state.story = null;
    },
  },
  extraReducers: {
    //login user
    [createUserStory.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createUserStory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      state.storyMessage = payload;
    },
    [createUserStory.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // register user
    [getUserStories.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserStories.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.storyGet = true; // registration successful
      state.story = payload;
    },
    [getUserStories.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { removeStory } = storySlice.actions;
export default storySlice.reducer;
