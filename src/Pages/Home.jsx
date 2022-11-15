import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../Components/Post/PostCard";
import UserStoryPic from "../Components/story/UserStoryPic";
import { removeStory } from "../app/features/story/storySlice";
import { unSuccess } from "../app/features/story/storySlice";
import { removeEdit } from "../app/features/post/postSlice";
import { BsPlusCircle } from "react-icons/bs";
import { removeCommentStatus } from "../app/features/comment/commentSlice";
import "../StyleSheets/story-style.css";
import { toast } from "react-toastify";
import { getAllPost } from "../app/features/post/postAction";
import { getFollowings } from "../app/features/user/userAction";

const Home = () => {
  const { edit, deleteResult, posts, deleteSuccess, editSuccess } = useSelector(
    (state) => state.post
  );
  const { userInfo, followings } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // dispatch(removeStory());

  useEffect(() => {
    // dispatch(getAllPost());
    // dispatch(getFollowings());
    dispatch(unSuccess());
    dispatch(removeCommentStatus());
  }, []);

  useEffect(() => {
    if (editSuccess && edit != null) {
      toast.success(edit?.message);
      dispatch(removeEdit());
    }
  }, [editSuccess]);

  useEffect(() => {
    if (deleteSuccess && deleteResult != null)
      toast.info(deleteResult?.message);
    dispatch(removeEdit());
  }, [deleteResult]);

  const handleStory = () => {
    navigate("/createStory");
  };

  return (
    <>
      <div className="img-list">
        <div className="img-container">
          <div onClick={handleStory}>
            <BsPlusCircle className="plus-icon" />
            <span className="story-username pl-5">{userInfo?.name}</span>
          </div>

          {followings?.map((user, index) => (
            <div key={index}>
              <UserStoryPic user={user} />
            </div>
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
