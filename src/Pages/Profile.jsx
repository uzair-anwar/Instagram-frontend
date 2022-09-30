import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, getRequests } from "../app/features/user/userAction";
import { getSelfStories } from "../app/features/story/storyAction";
import PostCard from "../Components/Post/PostCard";
import "../StyleSheets/navbar-style.css";
import Requests from "../Components/Account/Requests";
import SingleStory from "../Components/story/SingleStory";

const Profile = () => {
  let { userInfo, userToken, requests } = useSelector((state) => state.user);
  let { selfStories } = useSelector((state) => state.story);
  const [showPost, setShowPost] = useState(false);
  const [singlePost, setSinglePost] = useState(null);
  const [requestSection, setRequestSection] = useState(false);
  const [storySection, setStorySection] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  const handlePost = (post) => {
    setSinglePost(post);
    setShowPost(true);
  };

  const handleEdit = () => {
    navigate("/editProfile");
  };

  const handleShowRequest = () => {
    dispatch(getRequests());
    if (requestSection === false) setRequestSection(true);
    else setRequestSection(false);
  };

  const handleStories = () => {
    dispatch(getSelfStories());
    if (storySection === false) setStorySection(true);
    else setStorySection(true);
  };

  return (
    <div className="profile-info">
      <div className="upper-info">
        <div className="user-info">
          <div>
            <img className="user-pic" src={userInfo?.image} alt="Profile Pic" />
          </div>

          <div>
            <h4>{userInfo?.name}</h4>
            <h5>{userInfo?.email}</h5>
            <div className="post-info">
              <h6>{userInfo?.posts?.length} Post</h6>
              <h6>{userInfo?.followers} followers</h6>
              <h6>{userInfo?.followings} following</h6>
            </div>

            <div className="buttons-section">
              <div>
                {userInfo ? (
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </button>
                ) : null}
              </div>

              <div>
                {userInfo?.isPrivate ? (
                  <button
                    className="btn btn-outline-success mx-2"
                    onClick={handleShowRequest}
                  >
                    Requests
                  </button>
                ) : null}
              </div>

              <div>
                {userInfo ? (
                  <button
                    className="btn btn-outline-success mx-2"
                    onClick={handleStories}
                  >
                    Stories
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gallery">
        {userInfo?.posts?.map((post, index) => (
          <img
            key={index}
            className="item"
            src={post?.images[index]?.url}
            alt="Post"
            onClick={() => handlePost(post)}
          />
        ))}
      </div>

      {showPost ? <PostCard post={singlePost} key={singlePost?.id} /> : null}

      {requestSection ? (
        <div>
          {requests != null && requests?.length > 0 ? (
            <div className="container-fluid">
              <h1 className="my-2">Requests</h1>
              {requests?.map((request, index) => (
                <Requests request={request} />
              ))}
            </div>
          ) : (
            <h1>No Request Found</h1>
          )}
        </div>
      ) : null}

      {storySection ? (
        <div>
          {selfStories != null && selfStories?.length > 0 ? (
            <div className="container-fluid">
              <h1 className="my-2">Stories</h1>
              {selfStories?.map((story, index) => (
                <SingleStory story={story} />
              ))}
            </div>
          ) : (
            <h1>No Story Found</h1>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
