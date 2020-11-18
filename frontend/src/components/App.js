import React from "react";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Feed from "./Feed";
import axios from "axios";
import Profile from "./Profile";
import Spinner from "./Spinner";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            isAuthenticated: false,
            loading: true,
        };
    }

    componentDidMount() {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "Authorization": `Token ${token}`,
                    "Accept": "application/json"
                }
            };

            axios
                .get("/api/auth/user", config)
                .then(res => {
                    this.setState({
                        user: res.data,
                        isAuthenticated: true,
                        loading: false
                    });
                })
                .catch(err => {
                    localStorage.removeItem("token");
                    this.setState({ loading: false });
                    console.log(err.response.status);
                });
        } else {
            this.setState({ loading: false });
        }
    }

    authentication = (action, user = null) => {
        switch (action) {
            case "LOGIN":
                this.setState({
                    user: user,
                    isAuthenticated: true
                });
                break;
            case "LOGOUT":
                const token = localStorage.getItem("token");
                const config = {
                    headers: {}
                };

                if (token) {
                    config.headers["Authorization"] = `Token ${token}`;
                }

                axios
                    .post("/api/auth/logout", null, config)
                    .then(res => {
                        localStorage.removeItem("token");
                        this.setState({
                            user: null,
                            isAuthenticated: false
                        });
                    })
                    .catch(err => {
                        console.log("err.res.status=", err.response.status, "err.res.data=", err.response.data);
                    });
                break;
            default:
                console.log("TODO");
                break;
        }
    };

    render() {
        if (this.state.loading) {
            return (
                <div className="d-flex align-items-center h-100">
                    <Spinner />
                </div>
            );
        } else {
            return (
                <Router>
                    <Header
                        isAuthenticated={this.state.isAuthenticated}
                        user={this.state.user}
                        authentication={this.authentication}
                    />
                    <Switch>
                        <Route exact path="/">
                            <Feed
                                isAuthenticated={this.state.isAuthenticated}
                                user={this.state.user}
                                filter={false}
                            />
                        </Route>
                        <Route exact path={"/following"}>
                            {
                                this.state.isAuthenticated ?
                                    <Feed
                                        isAuthenticated={this.state.isAuthenticated}
                                        user={this.state.user}
                                        filter={true}
                                    /> : ""
                            }
                        </Route>
                        <Route exact path={`/user/:username`}>
                            <Profile
                                isAuthenticated={this.state.isAuthenticated}
                                user={this.state.user}
                            />
                        </Route>
                        <Route exact path="/login">
                            <Login
                                isAuthenticated={this.state.isAuthenticated}
                                authentication={this.authentication}
                            />
                        </Route>
                        <Route exact path="/register">
                            <Register
                                isAuthenticated={this.state.isAuthenticated}
                                authentication={this.authentication}
                            />
                        </Route>
                    </Switch>
                </Router >
            );
        }
    }
}

export default App;