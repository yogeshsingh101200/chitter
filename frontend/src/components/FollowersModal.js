import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

export class FollowersModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            followers: [],
            loading: true
        };
    }

    componentDidMount() {
        const config = {
            params: {
                "username": this.props.username
            }
        };

        axios
            .get("/api/followers", config)
            .then(res => {
                const list = [];
                res.data.forEach(record => {
                    list.push(record.user);
                });
                this.setState({ followers: list, loading: false });
            })
            .catch(exception => {
                this.setState({ loading: false });
                console.log("exception", exception);
                console.log("exception.response", exception.response);
            });
    }

    render() {
        const listItems = this.state.followers.map(item => (
            <ListGroup.Item key={item} as={Link} className="text-decoration-none" to={`/user/${item}`}>
                {item}
            </ListGroup.Item>
        ));

        return (
            <Modal
                show={this.props.show}
                onHide={this.props.handleClose}
                centered
                size="sm"
            >
                <Modal.Body>
                    {this.state.loading ?
                        <Spinner />
                        : <ListGroup> {listItems} </ListGroup>
                    }
                </Modal.Body>
                <Button variant="success" onClick={this.props.handleClose}>
                    Close
                </Button>
            </Modal>
        );
    }
}

export default FollowersModal;
