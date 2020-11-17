import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CreatePost from "./CreatePost";
import PostList from "./PostList";

export class Feed extends Component {
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login" />;
        } else {
            if (!this.props.filter) {
                return (
                    <>
                        <CreatePost refresh={this.refresh} />
                        <PostList
                            url="/api/posts"
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
