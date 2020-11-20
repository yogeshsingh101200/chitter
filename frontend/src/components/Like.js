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
            if (this.props.user && like.by === this.props.user) {
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
                .delete(`/api/auth/likes/${this.state.likeID}`, config)
                .then(() => {
                    this.setState(state => ({
                        likeID: null,
                        likeCount: state.likeCount - 1,
                        className: "inactive",
                        isLiked: false
                    }));
                })
                .catch(exception => {
                    console.log("exception", exception);
                    console.log("exception.response", exception.response);
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
                .post("/api/auth/likes", body, config)
                .then(res => {
                    this.setState(state => ({
                        likeID: res.data.id,
                        likeCount: state.likeCount + 1,
                        className: "active",
                        isLiked: true
                    }));
                })
                .catch(exception => {
                    console.log("exception", exception);
                    console.log("exception.response", exception.response);
                });
        }
    };

    render() {
        return (
            <>
                <div className="p-0">
                    <FontAwesomeIcon
                        icon={faHeart}
                        onClick={this.props.user ? this.handleClick : void (0)}
                        className={this.state.className}
                    />
                </div>
                <div className="ml-2 p-0">{this.state.likeCount}</div>
            </>
        );
    }
}

export default Like;
