import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CreatePost from "./CreatePost";
import Post from "./Post";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';

export class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            next: false,
            previous: false,
            offset: 0,
            posts: []
        };
    }

    refresh = () => {
        const url = this.props.filter ? "/api/auth/following/posts" : "/api/posts";

        const config = {
            params: {
                "limit": 5,
                "offset": this.state.offset
            },
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
                this.setState(
                    {
                        next: res.data.next ? true : false,
                        previous: res.data.previous ? true : false,
                        posts: res.data.results
                    }
                );
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
                user={this.props.user}
                refresh={this.refresh}
            />)
        );
    };

    resetStates = () => {
        this.setState({
            next: false,
            previous: false,
            offset: 0,
            posts: []
        });
        this.refresh();
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filter !== this.props.filter) {
            this.resetStates();
        }
        if (prevState.offset !== this.state.offset) {
            this.refresh();
        }
    }

    handlePrevious = () => {
        this.setState(state => ({ offset: state.offset - 5 }));
    };

    handleNext = () => {
        this.setState(state => ({ offset: state.offset + 5 }));
    };

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        } else {
            return (
                <>
                    {!this.props.filter ?
                        <CreatePost refresh={this.refresh} />
                        : ""}
                    {this.renderPosts()}
                    <Pagination className="my-2 justify-content-center">
                        <Pagination.Item onClick={this.handlePrevious} disabled={!this.state.previous}>Previous</Pagination.Item>
                        <Pagination.Item onClick={this.handleNext} disabled={!this.state.next}>Next</Pagination.Item>
                    </Pagination>
                </>
            );
        }
    }
}

export default Dashboard;
