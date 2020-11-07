import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Redirect } from "react-router-dom";

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

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
            .post("/api/auth/login", body, config)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                this.props.authentication("LOGIN", res.data.user);
            })
            .catch(err => {
                console.log("err.res.data=", err.response.data, "err.res.status=", err.response.status);
            });
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        } else {
            return (
                <div className="form-container">
                    <Form className="form" onSubmit={this.handleSubmit} noValidate>
                        <h3 className="mb-3 font-weight-normal text-center">Login</h3>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                placeholder="Enter username"
                                autoFocus
                                autoComplete="off"
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                placeholder="Enter password"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" block>
                            Login
                    </Button>
                    </Form>
                </div>
            );
        }
    }
}

export default Login;