import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import postReducer from "./features/post/postSlice";
import commentReducer from "./features/comment/commentSlice";
import storyReducer from "./features/story/storySlice";

export default configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    comment: commentReducer,
    story: storyReducer,
  },
});
