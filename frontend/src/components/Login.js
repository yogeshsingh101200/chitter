import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
    username: Yup.string()
        .required("Required"),
    password: Yup.string()
        .required("Required")
});

export class Login extends Component {
    handleSubmit = (values, actions) => {
        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        };

        const body = JSON.stringify(values);

        axios
            .post("/api/auth/login", body, config)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                this.props.authentication("LOGIN", res.data.user);
            })
            .catch(exception => {
                if (exception.response && exception.response.status === 400) {
                    actions.setFieldError("general", exception.response.data.non_field_errors[0]);
                } else {
                    console.log("exception", exception);
                    console.log("exception.response", exception.response);
                }
                actions.setSubmitting(false);
            });
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        } else {
            return (
                <div className="form-container">
                    <Formik
                        initialValues={{ username: "", password: "" }}
                        validationSchema={schema}
                        onSubmit={this.handleSubmit}
                    >
                        {formik => (
                            <Form className="form" onSubmit={formik.handleSubmit} noValidate>
                                <h3 className="mb-3 font-weight-normal text-center">Login</h3>
                                {
                                    formik.errors.general && (
                                        <div className="text-center form-level-errors">
                                            {formik.errors.general}
                                        </div>
                                    )
                                }
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        placeholder="Enter username"
                                        isValid={formik.touched.username && !formik.errors.username}
                                        isInvalid={formik.touched.username && formik.errors.username}
                                        autoComplete="off"
                                        {...formik.getFieldProps("username")}
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
                                        name="password"
                                        placeholder="Enter password"
                                        isValid={formik.touched.password && !formik.errors.password}
                                        isInvalid={formik.touched.password && formik.errors.password}
                                        {...formik.getFieldProps("password")}
                                    />
                                    <Form.Control.Feedback type="valid">
                                        Looks Good!
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit" block disabled={formik.isSubmitting}>
                                    Login
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div >
            );
        }
    }
}

export default Login;
