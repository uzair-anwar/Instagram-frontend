import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../app/features/post/postAction";
import { getFollowings } from "../app/features/user/userAction";
import PostCard from "../Components/Post/PostCard";
import UserStoryPic from "../Components/story/UserStoryPic";
import { removeStory } from "../app/features/story/storySlice";
import { unSuccess } from "../app/features/story/storySlice";
import { removeEdit } from "../app/features/post/postSlice";
import { BsPlusCircle } from "react-icons/bs";
import "../StyleSheets/story-style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const notify = (message) => {
  if (message !== undefined) {
    toast.error(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

const Home = () => {
  const { deleteResult, posts, deleteSuccess, editSuccess } = useSelector(
    (state) => state.post
  );
  const { userInfo, followings } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(removeStory());

  useEffect(() => {
    dispatch(getFollowings());
    dispatch(unSuccess());
    dispatch(removeEdit());
  }, []);

  useEffect(() => {
    notify(deleteResult?.message);
  }, [deleteResult]);

  useEffect(() => {
    if (posts === null || deleteSuccess || editSuccess) {
      dispatch(getAllPost());
    }
  }, [posts, dispatch, deleteSuccess, editSuccess]);

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
