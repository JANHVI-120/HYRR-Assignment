// SignupForm.js

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  // Add more validation for optional fields if needed
});

const SignupForm = () => {
  const history = useHistory();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (values, { setSubmitting }) => {
    // Simulate sending a welcome email (not a real email sending)
    setTimeout(() => {
      setSuccessMessage("Signup successful! Welcome aboard!");
      setSubmitting(false);
      // Redirect to the post list screen after successful signup
      history.push("/posts");
    }, 1000);
  };

  return (
    <div>
      <h2>Signup</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          // Add more optional fields here
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <label>Confirm Password</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>
            {/* Add more optional fields here */}
            <div>
              <label>
                <Field type="checkbox" name="termsAndConditions" />I accept the
                terms and conditions
              </label>
              <ErrorMessage name="termsAndConditions" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Signup
            </button>
          </Form>
        )}
      </Formik>
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
};

export default SignupForm;
