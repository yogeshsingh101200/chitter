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
        axios
            .get("/api/allposts")
            .then(res => {
                this.setState({ posts: res.data });
            })
            .catch(err => {
                console.log(err.response.status);
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

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
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

export default Dashboard;
