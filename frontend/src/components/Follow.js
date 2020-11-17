import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export class Follow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: null,
            isFollowed: false
        };
    }

    componentDidMount() {
        this.props.connections.forEach(connection => {
            if (connection.user === this.props.authenticatedUser) {
                this.setState(
                    {
                        id: connection.id,
                        isFollowed: true
                    }
                );
            }
        });
    }

    handleFollow = () => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        };

        const body = {
            "follows": this.props.user
        };

        axios
            .post("/api/auth/connections", body, config)
            .then(res => {
                this.setState({
                    id: res.data.id,
                    isFollowed: true
                });
                this.props.refresh();
            })
            .catch(err => {
                console.log(err.response.status);
            });
    };

    handleUnfollow = () => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                "Authorization": `Token ${token}`
            }
        };

        axios
            .delete(`/api/auth/connections/${this.state.id}`, config)
            .then(res => {
                this.setState({
                    id: null,
                    isFollowed: false
                });
                this.props.refresh();
            })
            .catch(err => {
                console.log(err.response.status);
            });
    };

    render() {
        if (this.state.isFollowed) {
            return (
                <Button
                    variant="danger"
                    onClick={this.handleUnfollow}
                    size="sm"
                >
                    Unfollow
                </Button>
            );
        } else {
            return (
                <Button
                    variant="success"
                    onClick={this.handleFollow}
                    size="sm"
                >
                    Follow
                </Button>
            );
        }
    }
}

export default Follow;
