import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Follow from "./Follow";
import axios from "axios";

export class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    refresh = () => {
        const config = {
            params: {
                "username": this.props.username
            }
        };

        axios
            .get("/api/users", config)
            .then(res => {
                this.setState({ user: res.data[0] });
            })
            .catch(err => {
                console.log(err.response.status);
            });
    };

    componentDidMount() {
        this.refresh();
    }

    render() {
        if (this.state.user) {
            return (
                <Card className="profile">
                    <Card.Body>
                        <div className="custom-card-header d-flex justify-content-between align-items-center mb-2">
                            <Card.Title className="custom-card-title my-auto">@{this.state.user.username}</Card.Title>
                            {
                                this.props.isAuthenticated && this.state.user.username !== this.props.user.username ?
                                    <Follow
                                        connections={this.state.user.followers}
                                        authenticatedUser={this.props.user.id}
                                        user={this.state.user.id}
                                        refresh={this.refresh}
                                    />
                                    : ""
                            }
                        </div>
                        <Card.Link href="#">
                            <span className="font-weight-bold stats">{this.state.user.following_count}</span> Following
                    </Card.Link>
                        <Card.Link href="#">
                            <span className="font-weight-bold stats">{this.state.user.followers_count}</span> Followers
                    </Card.Link>
                    </Card.Body>
                </Card>
            );
        } else {
            return (
                <div>No user!</div>
            );
        }
    }
}

export default User;
