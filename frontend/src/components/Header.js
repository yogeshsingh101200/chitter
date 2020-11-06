import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import logout from "./logout";

export class Header extends Component {
    render() {
        let nav;
        if (this.props.isAuthenticated) {
            nav = (
                <>
                    <Nav className="mr-auto">
                        <Nav.Link
                            as={NavLink}
                            to="/"
                            className="font-weight-bold"
                            activeClassName="active"
                        >
                            Home
                        </Nav.Link>
                    </Nav>
                    <Navbar.Text>
                        Logged in as, <span className="font-weight-bold">{this.props.user.username}</span>
                    </Navbar.Text>
                    <Button onClick={logout} variant="primary" className="ml-2">Logout</Button>
                </>
            );
        } else {
            nav = (
                <Nav className="ml-auto">
                    <Nav.Link
                        as={NavLink}
                        to="/login"
                        className="font-weight-bold"
                    >
                        Login
                    </Nav.Link>
                    <Nav.Link
                        as={NavLink}
                        to="/register"
                        className="font-weight-bold"
                    >
                        Register
                    </Nav.Link>
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
