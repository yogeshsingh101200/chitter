import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CreatePost from "./CreatePost";
import PostList from "./PostList";

export class Feed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deltaPost: 0
        };
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        } else {
            if (!this.props.filter) {
                return (
                    <>
                        <CreatePost refresh={() => this.setState(state => ({ deltaPost: state.deltaPost + 1 }))} />
                        <PostList
                            url="/api/posts"
                            delta={this.state.deltaPost}
                            {...this.props}
                        />
                    </>
                );
            } else {
                return (
                    <PostList
                        url="/api/auth/following/posts"
                        {...this.props}
                        token={localStorage.getItem("token")}
                    />
                );
            }
        }
    }
}

export default Feed;
