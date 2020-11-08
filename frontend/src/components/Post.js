import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Like from "./Like";
import EditPost from "./EditPost";

export class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        };
    }

    handleEdit = e => {
        e.preventDefault();

        this.setState({ isEditing: true });
    };

    goBack = () => {
        this.setState({ isEditing: false });
    };

    render() {
        let body = null;
        if (this.state.isEditing) {
            body = (
                <EditPost
                    content={this.props.content}
                    postID={this.props.id}
                    goBack={this.goBack}
                    refresh={this.props.refresh}
                />
            );
        } else {
            body = (
                <Card.Body>
                    <Card.Title>{this.props.author}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">4-Nov-2020 5:42</Card.Subtitle>
                    <Card.Text>
                        {this.props.content}
                    </Card.Text>
                    <div className="d-flex flex-row align-items-center">
                        <Like
                            user={this.props.user.id}
                            post={this.props.id}
                            likeCount={this.props.likeCount}
                            likes={this.props.likes}
                        />
                        {
                            this.props.author === this.props.user.username ?
                                <Card.Link
                                    href="#"
                                    className="ml-auto"
                                    onClick={this.handleEdit}
                                >
                                    Edit
                                </Card.Link>
                                : ""
                        }
                    </div>
                </Card.Body>
            );
        }

        return (
            <Card className="post">
                {body}
            </Card>
        );
    }
}

export default Post;
