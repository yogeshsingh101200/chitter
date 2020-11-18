import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Follow from "./Follow";
import axios from "axios";
import Spinner from "./Spinner";
import FollowingModal from "./FollowingModal";
import FollowersModal from "./FollowersModal";
import NotFound from "./NotFound";

export class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            showFollowing: false,
            showFollowers: false,
            loading: true
        };
    }

    refresh = () => {
        this.setState({ loading: true });

        const config = {
            params: {
                "username": this.props.username
            }
        };

        axios
            .get("/api/users", config)
            .then(res => {
                this.setState({ user: res.data[0], loading: false });
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log(err.response.status);
            });
    };

    componentDidMount() {
        this.refresh();
    }

    showFollowing = () => {

    };

    showFollowers = () => {

    };

    render() {
        if (this.state.loading) {
            return <Spinner />;
        } else if (this.state.user) {
            return (
                <>
                    <Card className="profile">
                        <Card.Body>
                            <div className="custom-card-header d-flex justify-content-between align-items-center mb-2">
                                <Card.Title className="custom-card-title my-auto text-wrap">@{this.state.user.username}</Card.Title>
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
                            <Card.Link
                                onClick={this.state.user.following_count > 0 ? () => this.setState({ showFollowing: true }) : void (0)}
                            >
                                <span className="font-weight-bold stats">{this.state.user.following_count}</span> Following
                            </Card.Link>
                            <Card.Link
                                onClick={this.state.user.followers_count > 0 ? () => this.setState({ showFollowers: true }) : void (0)}
                            >
                                <span className="font-weight-bold stats">{this.state.user.followers_count}</span> Followers
                            </Card.Link>
                        </Card.Body>
                    </Card>
                    <FollowingModal
                        show={this.state.showFollowing}
                        handleClose={() => this.setState({ showFollowing: false })}
                        {...this.props}
                    />
                    <FollowersModal
                        show={this.state.showFollowers}
                        handleClose={() => this.setState({ showFollowers: false })}
                        {...this.props}
                    />
                </>
            );
        } else {
            return (
                <NotFound />
            );
        }
    }
}

export default User;
