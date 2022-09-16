import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../app/features/user/userAction";
import { logout } from "../app/features/user/userSlice";
import { removePost } from "../app/features/post/postSlice";
import "../StyleSheets/navbar-style.css";

const Navbar = () => {
  const { userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {userToken ? (
            <>
              <li>
                <NavLink className="btn btn-secondary" to="/create">
                  Create
                </NavLink>
              </li>
              <li>
                <NavLink className="btn btn-secondary" to="/profile">
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
