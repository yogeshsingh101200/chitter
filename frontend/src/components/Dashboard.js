import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CreatePost from "./CreatePost";

export class Dashboard extends Component {
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        } else {
            return (
                <div>
                    <CreatePost />
                </div>
            );
        }
    }
}

export default Dashboard;
