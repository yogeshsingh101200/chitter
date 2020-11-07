import React from "react";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import axios from "axios";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: null,
            isAuthenticated: false
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
                        isAuthenticated: true
                    });
                })
                .catch(err => {
                    localStorage.removeItem("token");
                    console.log(err.response.status);
                });
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
        return (
            <Router>
                <Header
                    isAuthenticated={this.state.isAuthenticated}
                    user={this.state.user}
                    authentication={this.authentication}
                />
                <Switch>
                    <Route exact path="/">
                        <Dashboard
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
            </Router>
        );
    }
}

export default App;