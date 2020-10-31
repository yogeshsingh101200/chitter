import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: localStorage.getItem("token") ? true : false
        };
    }

    logout = () => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {}
        };

        if (token) {
            config.headers["Authorization"] = `Token ${token}`;
        }

        axios
            .post("/api/auth/logout", null, config)
            .then(res => {
                localStorage.removeItem("token");
                this.setState({ isAuthenticated: false });
            })
            .catch(err => {
                console.log("err.res.status=", err.response.status, "err.res.data=", err.response.data);
            });
    };

    render() {
        if (!this.state.isAuthenticated) {
            return <Redirect to="/login" />;
        } else {
            return (
                <div>
                    <h1 className="text-center">Hello, World!</h1>
                    <Button onClick={this.logout} variant="primary">Logout</Button>
                </div>
            );
        }
    }
}

export default Dashboard;
