import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
    username: Yup.string()
        .required("Required")
        .min(2, "Must be 2 or more characters long")
        .max(15, "Must be 15 or less characters long"),
    password: Yup.string()
        .required("Required")
        .min(8, "Must be 8 or more characters long")
        .matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, "Password must contain atleast one numeric, one lowercase and one uppercase"),
    confirmPassword: Yup.string()
        .required("Required")
        .test("passwords-match", "Does not match with password", function (value) {
            return this.parent.password === value;
        })
});

export class Register extends Component {
    handleSubmit = (values, actions) => {

        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        };

        const body = JSON.stringify(values);

        axios
            .post("/api/auth/register", body, config)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                this.props.authentication("LOGIN", res.data.user);
            })
            .catch(exception => {
                if (exception.response && exception.response.status === 400) {
                    actions.setFieldError("username", exception.response.data.username[0]);
                } else {
                    console.log("exception", exception);
                    console.log("exception.response", exception.response);
                }
            })
            .finally(
                actions.setSubmitting(false)
            );
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <div className="form-container" id="form-register">
                <Formik
                    initialValues={{ username: "", password: "", confirmPassword: "" }}
                    validationSchema={schema}
                    onSubmit={this.handleSubmit}
                >
                    {formik => (
                        <Form className="form" onSubmit={formik.handleSubmit} noValidate>
                            <h3 className="mb-3 text-center">Register</h3>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Choose Username"
                                    name="username"
                                    autoComplete="off"
                                    isValid={formik.touched.username && !formik.errors.username}
                                    isInvalid={formik.touched.username && formik.errors.username}
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                />
                                <Form.Control.Feedback type="valid">
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    isValid={formik.touched.password && !formik.errors.password}
                                    isInvalid={formik.touched.password && formik.errors.password}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                <Form.Control.Feedback type="valid">
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Re-enter Password"
                                    name="confirmPassword"
                                    isValid={formik.touched.confirmPassword && !formik.errors.confirmPassword}
                                    isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                />
                                <Form.Control.Feedback type="valid">
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.confirmPassword}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit" block disabled={formik.isSubmitting}>
                                Register
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default Register;
