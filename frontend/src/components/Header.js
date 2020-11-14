import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export class Header extends Component {
    render() {
        let nav;
        if (this.props.isAuthenticated) {
            nav = (
                <>
                    <Nav className="mr-auto">
                        <Nav.Link
                            as={NavLink}
                            exact
                            to="/"
                            className="font-weight-bold"
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            exact
                            to="/following"
                            className="font-weight-bold"
                        >
                            Following
                        </Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <DropdownButton
                            title={this.props.user.username}
                            menuAlign="right"
                        >
                            <Dropdown.Item
                                as={NavLink}
                                exact
                                to={`/user/${this.props.user.username}`}
                            >
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => { this.props.authentication("LOGOUT"); }}
                            >
                                Logout
                            </Dropdown.Item>
                        </DropdownButton>
                    </Nav>
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
