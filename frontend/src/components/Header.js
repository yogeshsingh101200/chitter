import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export function Header(props) {
    let nav;
    let expand = "sm";

    if (props.isAuthenticated) {
        nav = (
            <>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link
                            as={NavLink}
                            exact
                            to="/"
                            className="font-weight-bold"
                        >
                            Feed
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
                        <Nav.Link
                            as={NavLink}
                            exact
                            to={`/user/${props.user.username}`}
                            className="font-weight-bold"
                        >
                            {props.user.username}
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="#"
                            className="font-weight-bold"
                            onClick={() => { props.authentication("LOGOUT"); }}
                        >
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </>
        );
    } else {
        expand = true;
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
        <Navbar bg="dark" variant="dark" className="p-2" expand={expand}>
            <Navbar.Brand as={Link} to="/">Chitter</Navbar.Brand>
            <Navbar.Toggle >
                <FontAwesomeIcon icon={faEllipsisV} />
            </Navbar.Toggle>
            {nav}
        </Navbar>
    );
}

export default Header;
