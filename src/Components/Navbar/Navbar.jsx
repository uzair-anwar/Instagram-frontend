import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
    navigate("/profile");
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
            <li className="search-field nav-item mx-1">
              <SearchField
                options={options}
                onInputChange={onInputChange}
                onClickInput={onClickInput}
              />
            </li>
            <li className="nav-item mx-1">
              <NavLink className="btn btn-danger" to="/create">
                Post
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink
                className="btn btn-secondary"
                to={"/profile"}
                state={{ check: true }}
              >
                Profile
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <button className="btn btn-danger" onClick={logoutUser}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item mx-2">
              <NavLink className="btn btn-success" to="/login">
                Login{" "}
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="btn btn-success" to="/signup">
                {" "}
                Signup
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
