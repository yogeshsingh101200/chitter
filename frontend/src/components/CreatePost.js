import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Card from "react-bootstrap/Card";

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
                this.props.refresh();
            })
            .catch(err => {
                console.log(err.response.status, err.response.data);
            });
    };

    render() {
        return (
            <Card className="post create-post">
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Control
                            name="content"
                            as="textarea"
                            rows={4}
                            value={this.state.content}
                            onChange={this.handleChange}
                            placeholder="Write something..."
                        />
                        <Button variant="primary" className="mt-2" type="submit">
                            Post
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default CreatePost;
