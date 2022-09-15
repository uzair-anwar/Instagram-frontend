import React, { useEffect } from "react";
import "../StyleSheets/posts-style.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../app/features/user/userAction";
import Home from "./Home";

const Main = () => {
  const { userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  return <Home />;
};

export default Main;
