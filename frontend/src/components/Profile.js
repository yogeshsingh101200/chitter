import React, { Component, useState } from "react";
import { useParams } from "react-router-dom";
import User from "./User";
import PostList from "./PostList";

export function Profile(props) {
    const data = useParams();

    return (
        <div key={data.username}>
            <User
                username={data.username}
                {...props}
            />
            <PostList
                username={data.username}
                url="/api/posts"
                {...props}
            />
        </div>
    );
}

export default Profile;
