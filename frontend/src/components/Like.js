import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class Like extends Component {
    constructor(props) {
        super(props);

        this.state = {
            likeID: null,
            likeCount: this.props.likeCount,
            className: "inactive",
            isLiked: false,
            likes: this.props.likes
        };
    }

    componentDidMount() {
        this.state.likes.forEach(like => {
            if (like.by == this.props.user) {
                this.setState({
                    likeID: like.id,
                    className: "active",
                    isLiked: true
                });
            }
        });
    }

    handleClick = () => {
        if (this.state.isLiked) {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                }
            };

            axios
                .delete(`/api/likes/${this.state.likeID}`, config)
                .then(res => {
                    this.setState(state => ({
                        likeID: null,
                        likeCount: state.likeCount - 1,
                        className: "inactive",
                        isLiked: false
                    }));
                })
                .catch(err => {
                    console.log(err.response.status);
                });
        } else {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                }
            };
            const body = {
                "by": this.props.user,
                "on": this.props.post
            };

            axios
                .post("/api/likes", body, config)
                .then(res => {
                    this.setState(state => ({
                        likeID: res.data.id,
                        likeCount: state.likeCount + 1,
                        className: "active",
                        isLiked: true
                    }));
                })
                .catch(err => {
                    console.log(err.response.status, err.response.data, this.props.key);
                });
        }
    };

    render() {
        return (
            <div className="d-flex flex-row align-items-center">
                <div className="p-0">
                    <FontAwesomeIcon
                        icon={faHeart}
                        onClick={this.handleClick}
                        className={this.state.className}
                    />
                </div>
                <div className="ml-2 p-0">{this.state.likeCount}</div>
            </div>
        );
    }
}

export default Like;
