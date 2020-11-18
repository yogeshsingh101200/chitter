import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Follow from "./Follow";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

function ModalList(props) {
    const listItems = props.list.map(item => (
        <ListGroup.Item key={item} as={Link} className="text-decoration-none" to={`/user/${item}`}>
            {item}
        </ListGroup.Item>
    ));

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            centered
            size="sm"
        >
            <Modal.Body>
                <ListGroup>
                    {listItems}
                </ListGroup>
            </Modal.Body>
            <Button variant="success" onClick={props.handleClose}>
                Close
            </Button>
        </Modal>
    );
}


export class User extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            following: [],
            followers: [],
            showFollowing: false,
            showFollowers: false
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

        axios
            .get("/api/following", config)
            .then(res => {
                const list = [];
                res.data.forEach(record => {
                    list.push(record.follows);
                });
                this.setState({ following: list });
            })
            .catch(err => {
                console.log(err.response.status);
            });

        axios
            .get("/api/followers", config)
            .then(res => {
                const list = [];
                res.data.forEach(record => {
                    list.push(record.user);
                });
                this.setState({ followers: list });
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
                <>
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
                    <ModalList
                        show={this.state.showFollowing}
                        list={this.state.following}
                        handleClose={() => this.setState({ showFollowing: false })}
                    />
                    <ModalList
                        show={this.state.showFollowers}
                        list={this.state.followers}
                        handleClose={() => this.setState({ showFollowers: false })}
                    />
                </>
            );
        } else {
            return (
                <div>No user!</div>
            );
        }
    }
}

export default User;
