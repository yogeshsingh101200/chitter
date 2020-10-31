import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export class Header extends Component {
    render() {
        let nav;
        if (this.props.isAuthenticated) {
            nav = (
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/" className="font-weight-bold">
                        All posts
                    </Nav.Link>
                </Nav>
            );
        } else {
            nav = (
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/login" className="font-weight-bold">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register" className="font-weight-bold">Register</Nav.Link>
                </Nav>
            );
        }
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/">MicroBlog</Navbar.Brand>
                {nav}
            </Navbar>
        );
    }
}

export default Header;
