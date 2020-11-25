import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object({
    content: Yup.string()
        .required("Can't be empty!")
        .max(250, "Post can't exceed 250 characters!")
});

export class CreatePost extends Component {
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
            .post("api/auth/posts", body, config)
            .then(() => {
                actions.resetForm();
                this.props.refresh();
            })
            .catch(exception => {
                console.log("exception", exception);
                console.log("exception.response", exception.response);
            })
            .finally(
                actions.setSubmitting(false)
            );
    };

    render() {
        return (
            <Card className="post create-post">
                <Card.Body>
                    <Formik
                        initialValues={{ content: "" }}
                        validationSchema={schema}
                        onSubmit={this.handleSubmit}
                    >
                        {formik => (
                            <Form onSubmit={formik.handleSubmit} noValidate>
                                <Form.Control
                                    name="content"
                                    as="textarea"
                                    rows={4}
                                    placeholder="Write something..."
                                    isValid={formik.touched.content && !formik.errors.content}
                                    isInvalid={formik.touched.content && formik.errors.content}
                                    value={formik.values.content}
                                    onChange={formik.handleChange}
                                />
                                <Form.Control.Feedback type="valid">
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.content}
                                </Form.Control.Feedback>

                                <Button variant="primary" className="mt-2" type="submit" disabled={formik.isSubmitting}>
                                    Post
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
        );
    }
}

export default CreatePost;
