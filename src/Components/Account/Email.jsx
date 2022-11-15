import React, { useEffect, useState } from "react";
import { Input, Button, Container, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../StyleSheets/account-style.css";
import { sendEmail } from "../../app/features/user/userAction";
import { toast } from "react-toastify";
import { setForgetEmail } from "../../app/features/user/userSlice";

const Email = () => {
  const navigate = useNavigate();
  const { emailStatus, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (emailStatus?.status === 200) {
      dispatch(setForgetEmail(email));
      toast.success(emailStatus?.message);
      navigate("/forgetPassword");
    } else {
      toast.success(emailStatus?.message);
    }
  }, [dispatch, navigate, emailStatus, email]);

  const onSubmit = async (values) => {
    dispatch(sendEmail({ email: values.email }));
    setEmail(values.email);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is Required")
        .email("Invalid email address"),
    }),
    onSubmit,
  });

  return (
    <Container className="container">
      <Paper className="paper">
        <div className="header">
          <h5>Forget Password</h5>
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

            <Button className="button" type="submit">
              Send Email
            </Button>

            {error !== null ? <div className="error-msg">{error}</div> : null}
          </form>
        </div>

        <div className="login-link">
          <p className="text">
            If you remember your password, Click here{" "}
            <span>
              <NavLink className="link" to="/login">
                Log in
              </NavLink>
            </span>
          </p>
          <p className="text">
            If you already recieved token/code then click here{" "}
            <span>
              <NavLink className="link" to="/forgetPassword">
                Code
              </NavLink>
            </span>
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default Email;
