import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserDetails, setFollow } from "../app/features/user/userAction";
import "../StyleSheets/navbar-style.css";

const Profile = () => {
  let { searchSuccess, searchedUsers, userInfo, userToken } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const check = location.state?.check;
  const [followText, setFollowText] = useState("Fellow");

  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  useEffect(() => {
    if (check) {
      dispatch(getUserDetails());
    }
  }, [check, dispatch]);

  if (searchSuccess) {
    userInfo = searchedUsers[0];
  }

  const handleFellow = () => {
    dispatch(setFollow({ followUserId: userInfo.id }));
    if (followText === "Fellow") setFollowText("Unfollow");
    else setFollowText("Fellow");
  };

  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={userInfo?.image}
              alt="Profile Pic"
            />
          </div>
          <div>
            <h4>{userInfo?.name}</h4>
            <h5>{userInfo?.email}</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6>10 posts</h6>
              <h6>10 followers</h6>
              <h6>10 following</h6>
            </div>
            {searchSuccess ? (
              <div>
                <button className="btn btn-primary" onClick={handleFellow}>
                  {followText}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="gallery">
        <img
          className="item"
          src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="Post"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="Post"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="Post"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="Post"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="Post"
        />
        <img
          className="item"
          src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="Post"
        />
      </div>
    </div>
  );
};

export default Profile;
