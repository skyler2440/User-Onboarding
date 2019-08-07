import React, {useEffect, useState} from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './Form.css'
function FormPage({ values, errors, touched, status }) {
    const [user, setUser] = useState([]);
    useEffect(() => {
        if(status) {
            setUser([...user, status])
        }
    }, [status])
  return (
    <>
      <h1>Please Create an Account</h1>
      <Form className='form'>
        <div className='form-field-area'>
          {touched.name && errors.name && <p className='form-error'>{errors.name}</p>}
          <Field className='form-field'  type="text" name="name" placeholder="Name" />
        </div>
        <div className='form-field-area'>
          {touched.email && errors.email && <p className='form-error'>{errors.email}</p>}
          <Field className='form-field'  type="email" name="email" placeholder="Email" />
        </div>
        <div className='form-field-area'>
          {touched.phone && errors.phone && <p className='form-error'>{errors.phone}</p>}
          <Field className='form-field'  type="phone" name="phone" placeholder="Phone" />
        </div>
        <div className='form-field-area'>
          {touched.password && errors.password && <p className='form-error'>{errors.password}</p>}
          <Field className='form-field'  type="password" name="password" placeholder="Password" />
        </div>
        <div className='form-field-area'>
          {touched.confirmPassword && errors.confirmPassword && (
            <p className='form-error'>{errors.confirmPassword}</p>
          )}
          <Field className='form-field' 
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <div className='form-field-area'>
          {touched.role && errors.role && <p className='form-error'>{errors.role}</p>}
          <Field className='form-field'  component="select" name="role">
            <option>Pleae Select your Role</option>
            <option value="front end dev">Front End Developer</option>
            <option value="back end dev">Back End Developer</option>
            <option value="full stack dev">Full Stack Developer</option>
          </Field>
        </div>
        <div className='form-field-area'>
            <label className='tos'   htmlFor="tos">
            {touched.tos && errors.tos && <p className='form-error'>{errors.tos}</p>}
            <Field className='tos'  type="checkbox" name="tos" checked={values.tos} />
            Accept TOS
          </label>
        </div>
        <button type='submit'>Submit</button>
      </Form>
      {user.map(users => (
          <>
          <p key={users.name}>{users.name}</p>
          <p key={users.phone}>{users.phone}</p>
          <p key={users.email}>{users.email}</p>
          <p key={users.password}>{users.password}</p>
          <p key={users.role}>{users.role}</p>

            </>
      ))}
    </>
  );
}

const FormikFormPage = withFormik({
  mapPropsToValues({
    name,
    email,
    password,
    confirmPassword,
    tos,
    role,
    phone
  }) {
    return {
      phone: phone || "",
      name: name || "",
      email: email || "",
      password: password || "",
      confirmPassword: confirmPassword || "",
      tos: tos || false,
      role: role || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Name is Required")
      .max(50, "Your name is too long"),
    phone: Yup.string()
      .required("Phone is Required")
      .min(10, "Phone minimum Length is 10 digits"),
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

  handleSubmit(values, formikBag) {
    if (values.email === "waffles@syrup.com") {
      formikBag.setErrors({ email: "That email is already taken" });
    } else if (values.tos === false) {
      formikBag.setErrors({ tos: "Please Accept the Terms of Service" });
    } else if (values.role === "Please Select your Role") {
      formikBag.setErrors({ role: "Role is Required" });
    } else if (values.role === "") {
      formikBag.setErrors({ role: "Role is Required" });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            // console.log(res.data)
            formikBag.setStatus(res.data)
        })
        .catch(err => console.log(err.response));
    }
  }
})(FormPage);
export default FormikFormPage;
