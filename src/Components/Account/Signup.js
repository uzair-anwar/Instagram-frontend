import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Paper, Input } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import "../../StyleSheets/account-style.css";
import { registerUser } from "../../app/features/user/userAction";

const Signup = () => {
  const [image, setImage] = useState(null);
  const { loading, userToken, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate("/login");
    // redirect authenticated user to profile screen
    if (userToken) navigate("/profile");
  }, [navigate, userToken, success]);

  const onSubmit = async (values) => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("image", image);

    dispatch(registerUser(formData));
  };

  //use Formik libraray
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      image: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for name ")
        .required("Required")
        .max(25, "Must be 25 characters or less"),
      username: Yup.string()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for name ")
        .required("Required")
        .max(10, "Must be 10 characters or less"),
      email: Yup.string().required("Required").email("Invalid email address"),

      password: Yup.string()
        .min(6, "password should be greater than 6 digit")
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
              placeholder="Enter Name"
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter Name"
            />

            {formik.touched.name && formik.errors.name ? (
              <div className="error-msg">{formik.errors.name}</div>
            ) : null}

            <input
              className="input"
              placeholder="Enter user name"
              id="username"
              name="username"
              type="text"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter User Name"
            />

            {formik.touched.username && formik.errors.username ? (
              <div className="error-msg">{formik.errors.username}</div>
            ) : null}

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

            <label className="label">Image for Profile</label>

            <Input
              type="file"
              name="image"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              onBlur={formik.handleBlur}
            />

            <Button className="button" type="submit" disabled={loading}>
              Sign Up
            </Button>

            {error !== null ? <div className="error-msg">{error}</div> : null}
          </form>
        </div>

        <div className="login-link">
          <p className="text">
            Already have Account ?{" "}
            <span>
              <NavLink className="link" to="/login">
                Log In
              </NavLink>
            </span>
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default Signup;
