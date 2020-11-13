import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Post from "./Post";


class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            posts: []
        };
    }

    getData = () => {
        axios
            .get(`/api/user/?username=${this.props.username}`)
            .then(res => {
                const user = res.data[0];
                axios
                    .get(`/api/allposts/?author=${user.id}`)
                    .then(res => {
                        this.setState(
                            {
                                user: user,
                                posts: res.data
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

    renderProfileCard = () => {
        return (
            <Card className="profile">
                <Card.Body>
                    <div className="custom-card-header d-flex justify-content-between">
                        <Card.Title>@{this.state.user.username}</Card.Title>
                        {
                            this.state.user.username !== this.props.authenticatedUser.username ?
                                <Button className="follow-btn" variant="success" size="sm">Follow</Button>
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
        axios
            .get(`/api/allposts/?author=${this.state.user.id}`)
            .then(res => {
                this.setState({ posts: res.data });
            })
            .catch(err => {
                console.log(err.response.status);
            });
    };

    renderPosts = () => {
        const posts = this.state.posts.slice().reverse();
        return posts.map(post => (
            <Post
                key={post.id}
                id={post.id}
                author={post.author}
                content={post.content}
                likeCount={post.like_count}
                likes={post.likes}
                user={this.props.authenticatedUser}
                refresh={this.refreshPosts}
            />)
        );
    };

    render() {
        if (this.state.user) {
            if (this.state.user.username !== this.props.username) {
                this.getData();
            }
            return (
                <>
                    {this.renderProfileCard()}
                    {this.renderPosts()}
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
