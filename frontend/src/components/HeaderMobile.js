import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";


export class HeaderMobile extends Component {
    render() {
        let nav;
        let expand = "sm";
        if (this.props.isAuthenticated) {
            nav = (
                <>
                    <Nav>
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
                        <Nav.Link
                            as={NavLink}
                            exact
                            to={`/user/${this.props.user.username}`}
                            className="font-weight-bold"
                        >
                            Profile
                            </Nav.Link>
                        <Nav.Link
                            onClick={() => { this.props.authentication("LOGOUT"); }}
                            className="font-weight-bold"
                        >
                            Logout
                            </Nav.Link>
                    </Nav>
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
            <>
                <Navbar expand={expand} bg="dark" variant="dark">
                    <Navbar.Brand as={Link} to="/">MicroBlog</Navbar.Brand>
                    <Navbar.Toggle >
                        <FontAwesomeIcon icon={faEllipsisV} />
                    </Navbar.Toggle>
                    <Navbar.Collapse className="nav-mobile">
                        {nav}
                    </Navbar.Collapse>
                </Navbar>
            </>
        );
    }
}

export default HeaderMobile;
