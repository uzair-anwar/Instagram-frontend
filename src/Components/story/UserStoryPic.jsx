import React from "react";
import { NavLink } from "react-router-dom";

const UserStoryPic = ({ user }) => {
  return (
    <NavLink
      to="showStory"
      className="image"
      state={{ userId: user.follower.id }}
    >
      <img src={user.follower.image} alt="UserPic" />
      <span className="story-username">{user.follower.username}</span>
    </NavLink>
  );
};

export default UserStoryPic;
