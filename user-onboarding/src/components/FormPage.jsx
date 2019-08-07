import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function FormPage ({values, errors, touched}) {
    return(
        <>
        <h1>Please Create an Account</h1>
        <Form>
            <div>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field type='text' name='name' placeholder='Name' />
            </div>
            <div>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type='email' name='email' placeholder='Email' />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type='password' name='name' placeholder='Password' />
            </div>
            <div>
                {touched.confirmPassword && errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <Field type='password' name='confirmPassword' placeholder='Confirm Password' />
            </div>
        </Form>
        </>
    )
}

const FormikFormPage = withFormik({
    mapPropsToValues({name, email, password, confirmPassword}){
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            confirmPassword: confirmPassword || ""
        }
    },


handleSubmit(values){
    console.log(values)
}
})(FormPage)
export default FormikFormPage;