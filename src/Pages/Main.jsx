import React, { useEffect } from "react";
import "../StyleSheets/posts-style.css";
import { useSelector } from "react-redux";
import Home from "./Home";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../app/features/user/userAction";
import Login from "../Components/Account/Login";
import { getFollowings } from "../app/features/user/userAction";
import { getAllPost } from "../app/features/post/postAction";

const Main = () => {
  const { userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
      dispatch(getFollowings());
      dispatch(getAllPost());
    }
  }, []);

  return userToken ? <Home /> : <Login />;
};

export default Main;
