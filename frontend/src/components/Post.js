import React, { Component } from "react";
import Card from "react-bootstrap/Card";

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
                    <Card.Link href="#">Like</Card.Link>
                    <Card.Link href="#">Edit</Card.Link>
                </Card.Body>
            </Card>
        );
    }
}

export default Post;
