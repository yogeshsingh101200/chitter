import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

export class CreatePost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const config = {
            headers: {
                "Accept": "application/json",
                "Authorization": `Token ${token}`,
                "Content-type": "application/json"
            }
        };

        const body = {
            "content": this.state.content
        };

        axios
            .post("api/posts", body, config)
            .then(res => {
                console.log("success");
                this.setState({ content: "" });
            })
            .catch(err => {
                console.log(err.response.status, err.response.data);
            });
    };

    render() {
        return (
            <div className="container">
                <Form className="mt-2" onSubmit={this.handleSubmit}>
                    <h4>Create Post</h4>
                    <Form.Control
                        name="content"
                        as="textarea"
                        rows={3}
                        value={this.state.content}
                        onChange={this.handleChange}
                    />
                    <Button variant="primary" className="mt-2" type="submit">
                        Post
                    </Button>
                </Form>
            </div>
        );
    }
}

export default CreatePost;
