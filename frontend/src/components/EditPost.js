import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";

export class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: this.props.content
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
            .put(`/api/auth/posts/${this.props.postID}`, body, config)
            .then(res => {
                console.log("success");
                this.props.refresh();
                this.props.goBack();
            })
            .catch(err => {
                console.log(err.response.status, err.response.data);
            });
    };

    render() {
        return (
            <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Control
                        name="content"
                        as="textarea"
                        rows={4}
                        value={this.state.content}
                        onChange={this.handleChange}
                    />
                    <Button variant="success" className="mt-2" type="submit">
                        Edit
                    </Button>
                    <Button
                        variant="secondary"
                        className="mt-2 ml-2"
                        type="button"
                        onClick={this.props.goBack}
                    >
                        Back
                    </Button>
                </Form>
            </Card.Body>
        );
    }
}

export default EditPost;
