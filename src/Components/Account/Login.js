import React, { useEffect } from "react";
import { Input, Button, Container, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../StyleSheets/account-style.css";
import { userLogin } from "../../app/features/user/userAction";
import { signedUp } from "../../app/features/user/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { userToken, error, loginMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signedUp());
  }, []);

  useEffect(() => {
    if (loginMessage?.status !== 200) {
      toast.success(loginMessage?.message);
    }
    if (userToken) {
      navigate("/");
    }
  }, [navigate, userToken, loginMessage]);

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
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string()
        // .matches(/\w*[a-z]\w*/, "Password must have a small letter")
        // .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
        // .matches(/\d/, "Password must have a numner")
        // .matches(
        //   /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        //   "Password must have a special character"
        // )
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required("Password is required"),
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
            <Input
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

            <Input
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
        <div className="login-link">
          <p className="text">
            If you forget your password, Click here{" "}
            <span>
              <NavLink className="link" to="/sendEmail">
                Forget Password
              </NavLink>
            </span>
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
