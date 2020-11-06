import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Like from "./Like";

export class Post extends Component {
    render() {
        return (
            <Card className="post">
                <Card.Body>
                    <Card.Title>{this.props.author}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">4-Nov-2020 5:42</Card.Subtitle>
                    <Card.Text>
                        {this.props.content}
                    </Card.Text>
                    <Like
                        user={this.props.user.id}
                        post={this.props.id}
                        likeCount={this.props.likeCount}
                        likes={this.props.likes}
                    />
                </Card.Body>
            </Card>
        );
    }
}

export default Post;
