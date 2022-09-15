import { Button, Container, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../StyleSheets/account-style.css";
import { userLogin } from "../../app/features/user/userAction";

const Login = () => {
  const navigate = useNavigate();

  const { userToken, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userToken) {
      navigate("/profile");
    }
  }, [navigate, userToken]);

  const onSubmit = async (values) => {
    const user = {
      email: values.email,
      password: values.password,
    };
    dispatch(userLogin(user));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Required").email("Invalid email address"),
      password: Yup.string()
        .min(6, "Password should be greater than 6 digit")
        .required("Required"),
    }),

    onSubmit,
  });

  return (
    <Container className="container">
      <Paper className="paper">
        <div className="header">
          <h5>Create Account</h5>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit} className="login-form">
            <input
              className="input"
              placeholder="Enter Email"
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter email"
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="error-msg">{formik.errors.email}</div>
            ) : null}

            <input
              className="input"
              placeholder="Enter Password"
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-msg">{formik.errors.password}</div>
            ) : null}

            <Button className="button" type="submit">
              Log in
            </Button>
            {error !== null ? <div className="error-msg">{error}</div> : null}
          </form>
        </div>

        <div className="login-link">
          <p className="text">
            If you have no account, Click here{" "}
            <span>
              <NavLink className="link" to="/signup">
                Sign Up
              </NavLink>
            </span>
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
