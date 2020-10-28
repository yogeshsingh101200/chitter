import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export class LoginForm extends Component {
    render() {
        return (
            <div className="form-container">
                <Form className="form">
                    <h3 className="mb-3 font-weight-normal text-center">Login</h3>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" />
                    </Form.Group>

                    <Button variant="primary" type="submit" block>
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}

export default LoginForm;
