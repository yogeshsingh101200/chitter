import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
    content: Yup.string()
        .required("Can't be empty!")
        .max(250, "Post can't exceed 250 characters!")
});

export class EditPost extends Component {
    handleSubmit = (values, actions) => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                "Accept": "application/json",
                "Authorization": `Token ${token}`,
                "Content-type": "application/json"
            }
        };

        const body = JSON.stringify(values);

        axios
            .put(`/api/auth/posts/${this.props.postID}`, body, config)
            .then(() => {
                this.props.refresh();
            })
            .catch(exception => {
                console.log("exception", exception);
                console.log("exception.response", exception.response);
                actions.setSubmitting(false);
            });
    };

    render() {
        return (
            <Card.Body>
                <Formik
                    initialValues={{ content: this.props.content }}
                    validationSchema={schema}
                    onSubmit={this.handleSubmit}
                >
                    {formik => (
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Control
                                name="content"
                                as="textarea"
                                rows={4}
                                isValid={formik.touched.content && !formik.errors.content}
                                isInvalid={formik.touched.content && formik.errors.content}
                                {...formik.getFieldProps("content")}
                            />
                            <Form.Control.Feedback type="valid">
                                Looks Good!
                                </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.content}
                            </Form.Control.Feedback>
                            <Button
                                variant="success"
                                className="mt-2"
                                type="submit"
                                disabled={formik.isSubmitting}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="secondary"
                                className="mt-2 ml-2"
                                type="button"
                                onClick={this.props.goBack}
                                disabled={formik.isSubmitting}
                            >
                                Back
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card.Body>
        );
    }
}

export default EditPost;
