import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Paper, Input } from "@material-ui/core";
import { Checkbox, Switch } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import "../../StyleSheets/account-style.css";
import { updateUser } from "../../app/features/user/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const EditProfile = () => {
  const { userInfo, loading, updateSuccess, updateInfo } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (loading === true) {
      notify("Account updation is in process, please wait");
    }
  }, [loading]);

  useEffect(() => {
    if (updateSuccess) navigate("/");
  }, [updateSuccess, navigate]);

  const onSubmit = async (values) => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    const editedUser = {
      name: values.name,
      username: values.username,
      isPrivate: values.isPrivate,
    };

    dispatch(updateUser(editedUser));
  };

  //use Formik libraray
  const formik = useFormik({
    initialValues: {
      name: userInfo?.name,
      username: userInfo?.username,
      email: userInfo?.email,
      oldPassword: "",
      newPassword: "",
      passwordConfirmation: "",
      isPrivate: false,
      image: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for name ")
        .required("Required")
        .max(25, "Must be 25 characters or less"),
      username: Yup.string()
        .required("Required")
        .max(10, "Must be 10 characters or less"),
    }),
    onSubmit,
  });

  return (
    <Container className="container">
      <Paper className="paper">
        <div className="header">
          <h5>Edited your Account</h5>
        </div>
        <div>
          <form onSubmit={formik.handleSubmit} className="login-form">
            <Input
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

            <Input
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

            <div className="checkbox-section">
              <label className="label">
                Checked for make account private:{" "}
              </label>

              <Input
                className="checkbox"
                type="checkbox"
                id="isPrivate"
                name="isPrivate"
                value={formik.values.isPrivate}
                onChange={formik.handleChange}
              />
            </div>

            <Button className="button" type="submit">
              Update
            </Button>

            {updateInfo?.status !== 200 ? (
              <div className="error-msg">{updateInfo?.message}</div>
            ) : null}
          </form>
        </div>

        <div className="login-link">
          <p className="text">
            Don'nt want to update{" "}
            <span>
              <NavLink className="link" to="/profile">
                Profile
              </NavLink>
            </span>
          </p>
        </div>
        <div className="login-link">
          <p className="text">
            If you want to update password{" "}
            <span>
              <NavLink className="link" to="/updatePassword">
                Update Password
              </NavLink>
            </span>
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default EditProfile;
