import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../app/features/post/postAction";
import { getUserStories } from "../app/features/story/storyAction";
import { getFollowings } from "../app/features/user/userAction";
import PostCard from "../Components/Post/PostCard";
import UserStoryPic from "../Components/story/UserStoryPic";

import "../StyleSheets/story-style.css";
const Home = () => {
  const { posts, deleteSuccess, editSuccess } = useSelector(
    (state) => state.post
  );
  const { followings } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowings());
  }, []);

  useEffect(() => {
    if (posts == null || deleteSuccess || editSuccess) {
      dispatch(getAllPost());
    }
  }, [posts, dispatch, deleteSuccess, editSuccess]);

  return (
    <>
      <div className="img-list">
        <div className="img-container">
          {followings?.map((user) => (
            <UserStoryPic user={user} />
          ))}
        </div>
      </div>
      {posts?.map((post, index) => (
        <div key={index}>
          <PostCard post={post} />
        </div>
      ))}
    </>
  );
};
export default Home;
