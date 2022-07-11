import React from "react";

import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ROLES } from "../../../models/roles.enum";
import { User } from "../../../models/user.class";

function RegisterForm() {
    let user = new User("Carlos", "carlos@mail.com", "12345678", ROLES.ADMIN);

    const initialValues = {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ROLES.USER,
    };

    const validationSchema = yup.object({
        userName: yup
            .string()
            .min(6, "Username too short")
            .max(12, "Username too long")
            .required("User name is required"),
        email: yup
            .string()
            .email("Enter a valid email")
            .required("Email is required"),
        password: yup
            .string()
            .min(8, "Password should be of minimum 8 characters length")
            .required("Password is required"),
        confirmPassword: yup
            .string()
            .when("password", {
                is: (value) => (value && value.length > 0 ? true : false),
                then: yup
                    .string()
                    .oneOf([yup.ref("password")], "Passwords must match"),
            })
            .required("Confirm password is required"),
        role: yup
            .string()
            .oneOf(
                [ROLES.ADMIN, ROLES.USER],
                "You must select a role: Admin or User"
            )
            .required("Role is required"),
    });

    const submitForm = (values) => {
        alert(JSON.stringify(values, null, 2));
    };

    return (
        <div>
            <h4>Register Form</h4>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitForm}
            >
                {({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleBlurt,
                }) => (
                    <Form>
                        <label htmlFor="">User Name</label>
                        <Field
                            id="userName"
                            type="text"
                            name="userName"
                            placeholder="Your Username"
                        />
                        {errors.userName && touched.userName && (
                            <ErrorMessage name="userName" component="div" />
                        )}

                        <label htmlFor="">Email</label>
                        <Field
                            id="email"
                            type="mail"
                            name="email"
                            placeholder="Add Your Email"
                        />
                        {errors.email && touched.email && (
                            <ErrorMessage name="email" component="div" />
                        )}

                        <label htmlFor="">Password</label>
                        <Field
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Add Your Password"
                        />
                        {touched.password && errors.password && (
                            <ErrorMessage name="password" component="div" />
                        )}

                        <label htmlFor="">Confirm Password</label>
                        <Field
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Your Passmord"
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                            />
                        )}

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default RegisterForm;
