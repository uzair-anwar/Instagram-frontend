import React, { useEffect } from "react";
import { Input, Button, Container, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../StyleSheets/account-style.css";
import { addNewPassword } from "../../app/features/user/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const NewPassword = (props) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  console.log(email);
  const { newPasswordStatus, newPasswordSuccess, updatePasswordStatus, error } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (newPasswordSuccess) {
      notify(newPasswordSuccess.message);
      navigate("/login");
    }
  }, [navigate, newPasswordSuccess, newPasswordStatus]);

  const onSubmit = async (values) => {
    dispatch(addNewPassword({ email, password: values.newPassword }));
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      newPassword: Yup.string().min(
        6,
        "password should be greater than 6 digit"
      ),

      confirmPassword: Yup.string().oneOf(
        [Yup.ref("newPassword"), null],
        "Passwords must match"
      ),
    }),

    onSubmit,
  });

  return (
    <Container className="container">
      <Paper className="paper">
        <div className="header">
          <h5>Add Password</h5>
        </div>

        <div>
          <form onSubmit={formik.handleSubmit} className="login-form">
            <Input
              className="input"
              placeholder="Enter new Password"
              id="newPassword"
              name="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter new Password"
            />

            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="error-msg">{formik.errors.newPassword}</div>
            ) : null}

            <Input
              className="input"
              placeholder="Enter confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Enter confirm Password"
            />

            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error-msg">{formik.errors.confirmPassword}</div>
            ) : null}

            <Button className="button" type="submit">
              Add
            </Button>

            {updatePasswordStatus !== null &&
            updatePasswordStatus.status !== 200 ? (
              <div className="error-msg">{updatePasswordStatus.message}</div>
            ) : null}
          </form>
        </div>

        <div className="login-link">
          <p className="text">
            Go back to Log in Page{" "}
            <span>
              <NavLink className="link" to="/login">
                Log in
              </NavLink>
            </span>
          </p>
        </div>
      </Paper>
    </Container>
  );
};

export default NewPassword;
