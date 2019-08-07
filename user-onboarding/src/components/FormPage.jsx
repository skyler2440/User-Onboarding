import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function FormPage({ values, errors, touched }) {
  return (
    <>
      <h1>Please Create an Account</h1>
      <Form>
        <div>
          {touched.name && errors.name && <p>{errors.name}</p>}
          <Field type="text" name="name" placeholder="Name" />
        </div>
        <div>
          {touched.email && errors.email && <p>{errors.email}</p>}
          <Field type="email" name="email" placeholder="Email" />
        </div>
        <div>
          {touched.password && errors.password && <p>{errors.password}</p>}
          <Field type="password" name="password" placeholder="Password" />
        </div>
        <div>
          {touched.confirmPassword && errors.confirmPassword && (
            <p>{errors.confirmPassword}</p>
          )}
          <Field
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <div>
        <label htmlFor="tos">
            {touched.tos && errors.tos && <p>{errors.tos}</p>}
            <Field type="checkbox" name="tos" checked={values.tos} />
            Accept TOS
          </label>
        </div>
        <button>Submit</button>
      </Form>
    </>
  );
}

const FormikFormPage = withFormik({
  mapPropsToValues({ name, email, password, confirmPassword, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      confirmPassword: confirmPassword || "",
      tos: tos || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string()
      .email("Email is not Valid")
      .required("Email is Required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters or longer")
      .required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match!"
    )
  }),

  handleSubmit(values) {
    console.log(values);
  }
})(FormPage);
export default FormikFormPage;
