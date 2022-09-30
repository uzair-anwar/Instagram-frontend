import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { CgProfile } from "react-icons/cg";
import { IoCreateOutline } from "react-icons/io5";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { BsMessenger } from "react-icons/bs";
import {
  getUserDetails,
  searchUsers,
  getSearchedUserDetails,
  getFollowStatus,
} from "../../app/features/user/userAction";
import { logout } from "../../app/features/user/userSlice";
import { removePost } from "../../app/features/post/postSlice";
import SearchField from "./SearchField";

const Navbar = () => {
  const { searchedUsers, userToken } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (searchUsers != null) setOptions(searchedUsers);
  }, [searchedUsers]);

  const onInputChange = (event) => {
    if (event.target.value.length > 0) {
      dispatch(searchUsers(event.target.value));
      if (searchUsers != null) setOptions(searchedUsers);
    } else {
      setOptions([]);
    }
  };

  const onClickInput = () => {
    dispatch(getSearchedUserDetails({ searchedId: searchedUsers[0].id }));
    dispatch(getFollowStatus({ searchedId: searchedUsers[0].id }));
    navigate("/search");
  };

  // automatically authenticate user if token is found
  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails());
    }
  }, [userToken, dispatch]);

  const logoutUser = () => {
    dispatch(logout());
    dispatch(removePost());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-expand-sm  navbar-light bg-white justify-content-between">
      <NavLink to="/" className="navbar-brand insta-logo left">
        Instagram
      </NavLink>

      <ul id="nav-mobile" className="navbar-nav float-right">
        {userToken ? (
          <>
            <li className="search-field nav-item mt-1 mx-2">
              <SearchField
                options={options}
                onInputChange={onInputChange}
                onClickInput={onClickInput}
              />
            </li>
            <Tooltip title="Post Create">
              <li className="nav-item mx-2">
                <NavLink className="ml-2" to="/create">
                  <IoCreateOutline className="profile-icon" />
                </NavLink>
              </li>
            </Tooltip>
            <Tooltip title="Messenger">
              <li className="nav-item mx-2">
                <NavLink className="ml-2" to="/messenger">
                  <BsMessenger className="profile-icon" />
                </NavLink>
              </li>
            </Tooltip>
            <Tooltip title="Profile">
              <li className="nav-item mx-2">
                <NavLink className="pt-2" to={"/profile"}>
                  <CgProfile className="profile-icon" />
                </NavLink>
              </li>
            </Tooltip>
            <Tooltip title="Logout">
              <li className="nav-item mx-3">
                <FiLogOut className="profile-icon" onClick={logoutUser} />
              </li>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Login">
              <li className="nav-item mx-2">
                <NavLink className="pt-2 ml-2" to="/login">
                  <FiLogIn className="profile-icon" />
                </NavLink>
              </li>
            </Tooltip>
            <Tooltip title="SignUp">
              <li className="nav-item mx-2">
                <NavLink className="btn btn-success" to="/signup">
                  {" "}
                  Signup
                </NavLink>
              </li>
            </Tooltip>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
