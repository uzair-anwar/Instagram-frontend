import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../app/features/user/userAction";
import { logout } from "../app/features/user/userSlice";
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
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          {userToken ? (
            <>
              <button className="button" onClick={() => dispatch(logout())}>
                Logout
              </button>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login"> Login </Link>
              </li>
              <li>
                <Link to="/signup"> Signup </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
