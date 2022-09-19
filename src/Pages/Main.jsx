import React from "react";
import "../StyleSheets/posts-style.css";
import { useSelector } from "react-redux";
import Home from "./Home";

const Main = () => {
  const { userToken } = useSelector((state) => state.user);
  return userToken ? <Home /> : <h1>Hy</h1>;
};

export default Main;
