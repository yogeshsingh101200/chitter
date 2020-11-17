import React, { Component } from "react";
import Post from "./Post";
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination';

export class PostList extends Component {
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
        const config = {
            params: {
                "limit": 5,
                "offset": this.state.offset
            },
            headers: {}
        };

        if ("username" in this.props) {
            config.params["author"] = this.props.username;
        }

        if ("token" in this.props) {
            config.headers["Authorization"] = `Token ${this.props.token}`;
        }

        axios
            .get(this.props.url, config)
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

    componentDidUpdate(prevProps, prevState) {
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
        return (
            <>
                {this.renderPosts()}
                <Pagination className="my-2 justify-content-center">
                    <Pagination.Item onClick={this.handlePrevious} disabled={!this.state.previous}>Previous</Pagination.Item>
                    <Pagination.Item onClick={this.handleNext} disabled={!this.state.next}>Next</Pagination.Item>
                </Pagination>
            </>
        );
    }
}

export default PostList;
