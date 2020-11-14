import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CreatePost from "./CreatePost";
import Post from "./Post";
import axios from "axios";

export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    refresh = () => {
        const url = this.props.filter ? "/api/following" : "/api/allposts";

        const config = {
            headers: {
                "Accept": "application/json"
            }
        };

        if (this.props.filter) {
            const token = localStorage.getItem("token");
            config.headers["Authorization"] = `Token ${token}`;
        }

        axios
            .get(url, config)
            .then(res => {
                this.setState({ posts: res.data });
            })
            .catch(err => {
                console.log(err.response.status, err.response.data);
            });
    };

    componentDidMount() {
        if (this.props.isAuthenticated)
            this.refresh();
    }

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
                user={this.props.user}
                refresh={this.refresh}
            />)
        );
    };

    componentDidUpdate(prevProps) {
        if (prevProps.filter !== this.props.filter) {
            this.refresh();
        }
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        } else {
            if (this.props.filter) {
                return (
                    <>
                        {this.renderPosts()}
                    </>
                );
            } else {
                return (
                    <>
                        <CreatePost refresh={this.refresh} />
                        {this.renderPosts()}
                    </>
                );
            }
        }
    }
}

export default Dashboard;
