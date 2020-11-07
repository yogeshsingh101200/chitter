import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Redirect } from "react-router-dom";

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmation: ""
        };
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.password !== this.state.confirmation)
            alert("Two password fields are not same!");
        else {
            const config = {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            };

            const username = this.state.username;
            const password = this.state.password;
            const body = JSON.stringify({ username, password });

            axios
                .post("/api/auth/register", body, config)
                .then(res => {
                    localStorage.setItem("token", res.data.token);
                    this.props.authentication("LOGIN", res.data.user);
                })
                .catch(err => {
                    console.log("err.res.data=", err.response.data, "err.res.status=", err.response.status);
                });
        }
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <div className="form-container" id="form-register">
                <Form className="form" onSubmit={this.handleSubmit}>
                    <h3 className="mb-3 text-center">Register</h3>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Choose Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            autoFocus
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="confirmation">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Re-enter Password"
                            name="confirmation"
                            value={this.state.confirmation}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" block>
                        Register
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Register;
