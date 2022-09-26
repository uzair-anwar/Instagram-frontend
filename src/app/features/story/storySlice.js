import { createSlice } from "@reduxjs/toolkit";
import {
  createUserStory,
  getUserStories,
  getSelfStories,
  deleteStory,
} from "./storyAction";

const initialState = {
  loading: false,
  story: null,
  storyGet: false,
  firstTime: true,
  storyMessage: null,
  error: null,
  success: false,
  selfStories: null,
  selfStoriesStatus: false,
  deleteStoryStatus: false,
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    removeStory: (state) => {
      state.story = null;
    },
    deleteSingleStory: (state, action) => {
      state.selfStories = state.selfStories.filter(
        (story) => story.id !== action.payload
      );
    },
    unSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: {
    //Cretae Story
    [createUserStory.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createUserStory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.storyMessage = payload;
    },
    [createUserStory.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Get follewer Stories
    [getUserStories.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserStories.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.storyGet = true;
      state.story = payload;
    },
    [getUserStories.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Get self stories
    [getSelfStories.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getSelfStories.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.selfStoriesStatus = true;
      state.selfStories = payload;
    },
    [getSelfStories.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Delete a story
    [deleteStory.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteStory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.deleteStoryStatus = payload;
    },
    [deleteStory.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { unSuccess, removeStory, deleteSingleStory } = storySlice.actions;
export default storySlice.reducer;
