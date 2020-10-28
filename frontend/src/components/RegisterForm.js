import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

export class RegisterForm extends Component {
    render() {
        return (
            <div className="form-container" id="form-register">
                <Form className="form">
                    <h3 className="mb-3 text-center">Register</h3>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Choose Username" />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="confirmation">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Re-enter Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" block>
                        Register
                    </Button>
                </Form>
            </div>
        );
    }
}

export default RegisterForm;
