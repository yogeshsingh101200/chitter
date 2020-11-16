import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Post from "./Post";
import Follow from "./Follow";
import Pagination from 'react-bootstrap/Pagination';


class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            next: false,
            previous: false,
            offset: 0,
            user: null,
            posts: []
        };
    }

    getData = () => {
        axios
            .get(`/api/user/?username=${this.props.username}`)
            .then(res => {
                const user = res.data[0];
                const config = {
                    params: {
                        "author": user.id,
                        "limit": 5,
                        "offset": this.state.offset
                    }
                };
                axios
                    .get("/api/allposts", config)
                    .then(res => {
                        this.setState(
                            {
                                next: res.data.next ? true : false,
                                previous: res.data.previous ? true : false,
                                user: user,
                                posts: res.data.results
                            }
                        );
                    })
                    .catch(err => {
                        console.log(err.response.status);
                    });
            })
            .catch(err => {
                console.log(err.response.status);
            });
    };

    componentDidMount() {
        this.getData();
    }

    refreshProfileCard = () => {
        axios
            .get(`/api/user/?username=${this.props.username}`)
            .then(res => {
                this.setState({ user: res.data[0] });
            })
            .catch(err => {
                console.log(err.response.status);
            });
    };

    renderProfileCard = () => {
        return (
            <Card className="profile">
                <Card.Body>
                    <div className="custom-card-header d-flex justify-content-between align-items-center mb-2">
                        <Card.Title className="custom-card-title my-auto">@{this.state.user.username}</Card.Title>
                        {
                            this.state.user.username !== this.props.authenticatedUser.username ?
                                <Follow
                                    connections={this.state.user.followers}
                                    authenticatedUser={this.props.authenticatedUser.id}
                                    user={this.state.user.id}
                                    refreshProfileCard={this.refreshProfileCard}
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
    };

    refreshPosts = () => {
        const config = {
            params: {
                "author": this.state.user.id,
                "limit": 5,
                "offset": this.state.offset
            }
        };

        axios
            .get("/api/allposts", config)
            .then(res => {
                this.setState(
                    {
                        next: res.data.next ? true : false,
                        previous: res.data.previous ? true : false,
                        posts: res.data.results
                    }
                );
            })
            .catch(err => {
                console.log(err.response.status);
            });
    };

    renderPosts = () => {
        const posts = this.state.posts.slice();
        return posts.map(post => (
            <Post
                key={post.id}
                id={post.id}
                author={post.author}
                content={post.content}
                created_at={post.created_at}
                likeCount={post.like_count}
                likes={post.likes}
                user={this.props.authenticatedUser}
                refresh={this.refreshPosts}
            />)
        );
    };

    handlePrevious = () => {
        this.setState(state => ({ offset: state.offset - 5 }));
    };

    handleNext = () => {
        this.setState(state => ({ offset: state.offset + 5 }));
    };

    resetStates = () => {
        this.setState({
            next: false,
            previous: false,
            offset: 0,
            user: null,
            posts: []
        });
        this.getData();
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.username !== this.props.username) {
            this.resetStates();
        }
        if (prevState.offset !== this.state.offset) {
            this.refreshPosts();
        }
    }

    render() {
        if (this.state.user) {
            return (
                <>
                    {this.renderProfileCard()}
                    {this.renderPosts()}
                    <Pagination className="my-2 justify-content-center">
                        <Pagination.Item onClick={this.handlePrevious} disabled={!this.state.previous}>Previous</Pagination.Item>
                        <Pagination.Item onClick={this.handleNext} disabled={!this.state.next}>Next</Pagination.Item>
                    </Pagination>
                </>
            );
        } else {
            return <div>404</div>;
        }
    }
}

export function Profile(props) {
    const data = useParams();

    return (
        <>
            <ProfilePage username={data.username} {...props} />
        </>
    );
}

export default Profile;
