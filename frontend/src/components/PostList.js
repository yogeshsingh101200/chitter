import React, { Component } from "react";
import Post from "./Post";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "./Spinner";

export class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            next: false,
            previous: false,
            offset: 0,
            posts: [],
            loading: false
        };
    }

    refresh = () => {
        this.setState({ loading: true });

        const config = {
            params: {
                "limit": 5,
                "offset": this.state.offset
            },
            headers: {
                "Accept": "application/json"
            }
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
                        posts: res.data.results,
                        loading: false
                    }
                );
            })
            .catch(exception => {
                this.setState({ loading: false });
                console.log("exception", exception);
                console.log("exception.response", exception.response);
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
        if ("delta" in this.props && prevProps.delta !== this.props.delta) {
            this.refresh();
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
        if (this.state.loading) {
            return <Spinner />;
        } else if (this.state.posts.length > 0) {
            return (
                <>
                    {this.renderPosts()}
                    <Pagination className="my-2 justify-content-center">
                        <Pagination.Item onClick={this.handlePrevious} disabled={!this.state.previous}>Previous</Pagination.Item>
                        <Pagination.Item onClick={this.handleNext} disabled={!this.state.next}>Next</Pagination.Item>
                    </Pagination>
                </>
            );
        } else if (this.props.filter) {
            return (<h3 className="w-100 text-center text-muted mt-3">
                No Posts to see, You haven't followed anyone!
            </h3>);
        } else {
            return null;
        }
    }
}

export default PostList;
