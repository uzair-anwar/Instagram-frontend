import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  searchUsers,
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

  const handleStory = () => {
    navigate("/createStory");
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand-logo left">
          Instagram
        </Link>

        <ul id="nav-mobile" className="right">
          {userToken ? (
            <>
              <li>
                <SearchField
                  options={options}
                  onInputChange={onInputChange}
                  onClickInput={onClickInput}
                />
              </li>
              <li>
                <button className="btn btn-success" onClick={handleStory}>
                  Story
                </button>
              </li>
              <li>
                <NavLink className="btn btn-secondary" to="/create">
                  Create
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="btn btn-secondary"
                  to={"/profile"}
                  state={{ check: true }}
                >
                  Profile
                </NavLink>
              </li>
              <button className="btn btn-danger" onClick={logoutUser}>
                Logout
              </button>
            </>
          ) : (
            <>
              <li>
                <NavLink className="btn btn-success" to="/login">
                  Login{" "}
                </NavLink>
              </li>
              <li>
                <NavLink className="btn btn-success" to="/signup">
                  {" "}
                  Signup{" "}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
