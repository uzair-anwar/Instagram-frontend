import React, { useEffect, useState } from "react";
import { Input, Button, Container, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../StyleSheets/account-style.css";
import {
  addNewPassword,
  compareCode,
} from "../../app/features/user/userAction";
import { toast } from "react-toastify";
import { removeCompareCodeStatus } from "../../app/features/user/userSlice";

const NewPassword = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const {
    newPasswordStatus,
    newPasswordSuccess,
    updatePasswordStatus,
    compareCodeStatus,
    email,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (compareCodeStatus != null) toast.info(compareCodeStatus?.message);
  }, [compareCodeStatus]);

  useEffect(() => {
    if (newPasswordSuccess) {
      toast.success(newPasswordSuccess?.message);
      dispatch(removeCompareCodeStatus());
      navigate("/login");
    }
  }, [dispatch, navigate, newPasswordSuccess, newPasswordStatus]);

  const onSubmit = async (values) => {
    dispatch(addNewPassword({ email, password: values.newPassword }));
  };

  const handleCodeSubmit = () => {
    if (code?.length < 1) setError("Code should not be empty");
    else if (code?.length > 6) setError("Code should not grater then 6 digits");
    else dispatch(compareCode({ code, email }));
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
        {compareCodeStatus == null || compareCodeStatus?.status !== 200 ? (
          <div>
            <div className="header">
              <h5>Add Code</h5>
            </div>
            <div className="dflex justify-content-center">
              <Input
                placeholder="Enter code"
                className="input"
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            {error ? <div className="error-msg">{error}</div> : null}
            <button
              className="btn btn-outline-info m-1"
              onClick={handleCodeSubmit}
            >
              Submit
            </button>
          </div>
        ) : (
          <>
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

                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="error-msg">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}

                <Button className="button" type="submit">
                  Add
                </Button>

                {updatePasswordStatus !== null &&
                updatePasswordStatus.status !== 200 ? (
                  <div className="error-msg">
                    {updatePasswordStatus.message}
                  </div>
                ) : null}
              </form>
            </div>
          </>
        )}

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
