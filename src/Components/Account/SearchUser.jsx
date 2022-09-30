import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  setFollow,
  sendRequest,
  getFollowStatus,
  getRequestStatus,
} from "../../app/features/user/userAction";
import { removeRequest } from "../../app/features/user/userSlice";
import PostCard from "../Post/PostCard";
import "../../StyleSheets/navbar-style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const SearchUser = () => {
  let {
    followStatus,
    searchedUserDetails,
    userToken,
    requestStatus,
    singleRequestStatus,
    followSuccess,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [followText, setFollowText] = useState("Fellow");
  const [requestTest, setRequestText] = useState("Request");
  const [showPost, setShowPost] = useState(false);
  const [singlePost, setSinglePost] = useState(null);

  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  useEffect(() => {
    dispatch(getFollowStatus({ searchedId: searchedUserDetails?.id }));
    dispatch(getRequestStatus({ searchedId: searchedUserDetails?.id }));
    dispatch(removeRequest());
  }, []);

  useEffect(() => {
    if (singleRequestStatus !== null && singleRequestStatus?.status === 201) {
      setFollowText("Un Request");
    } else {
      setFollowText("Request");
    }
  }, []);

  useEffect(() => {
    if (followStatus !== null && followStatus.status === 201) {
      setFollowText("Unfollow");
    } else {
      setFollowText("follow");
    }
  }, [followStatus]);

  useEffect(() => {
    notify(requestStatus?.message);
  }, [requestStatus]);

  useEffect(() => {
    notify(followSuccess?.message);
  }, [followSuccess]);

  const handleFellow = () => {
    dispatch(setFollow({ followId: searchedUserDetails.id }));
    if (followText === "Fellow") {
      setFollowText("Unfollow");
    } else {
      setFollowText("Fellow");
    }
  };

  const handleRequest = () => {
    dispatch(sendRequest({ requesterId: searchedUserDetails.id }));
    if (requestTest === "Request") setRequestText("Un Request");
    else setRequestText("Request");
  };

  const handlePost = (post) => {
    setSinglePost(post);
    setShowPost(true);
  };

  return (
    <div className="profile-info">
      <div className="upper-info">
        <div className="user-info">
          <div>
            <img
              className="user-pic"
              src={searchedUserDetails?.image}
              alt="Profile Pic"
            />
          </div>
          <div>
            <h4>{searchedUserDetails?.name}</h4>
            <h5>{searchedUserDetails?.email}</h5>
            <div className="post-info">
              <h6>{searchedUserDetails?.posts?.length} Post</h6>
              <h6>{searchedUserDetails?.followers} followers</h6>
              <h6>{searchedUserDetails?.followings} following</h6>
            </div>
            <div className="buttons-section">
              <div>
                {searchedUserDetails?.isPrivate === false ? (
                  <div>
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleFellow}
                    >
                      {followText}
                    </button>
                  </div>
                ) : null}
              </div>
              <div>
                {searchedUserDetails?.isPrivate &&
                followStatus.status !== 201 ? (
                  <>
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleRequest}
                    >
                      {requestTest}
                    </button>
                  </>
                ) : null}
              </div>
              {/* <div>
                {user?.isPrivate &&
                user?.id !== userInfo?.id &&
                singleRequestStatus?.status != 201 ? (
                  <>
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleRequest}
                    >
                      {requestTest}
                    </button>
                  </>
                ) : null}
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="gallery">
        {searchedUserDetails?.posts?.map((post, index) => (
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
    </div>
  );
};

export default SearchUser;
