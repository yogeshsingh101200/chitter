import React from "react";
import Header from "./Header";
import Login from "./Login";
import RegisterForm from "./RegisterForm";
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
            username: null,
            isAuthenticated: localStorage.getItem("token") ? true : false
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.update(), 0);

        if (this.state.isAuthenticated) {
            const config = {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            };

            axios.
                get("api/auth/user", config)
                .then(res => {
                    this.setState({ username: res.data.username });
                })
                .catch(err => {
                    token = null;
                    localStorage.removeItem("token");
                });

        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    update = () => {
        if (!localStorage.getItem("token") && this.state.isAuthenticated) {
            this.setState({ isAuthenticated: false });
        } else if (localStorage.getItem("token") && !this.state.isAuthenticated) {
            this.setState({ isAuthenticated: true });
        };
    };

    render() {
        return (
            <Router>
                <Header
                    isAuthenticated={this.state.isAuthenticated}
                    username={this.state.username}
                />
                <Switch>
                    <Route exact path="/">
                        <Dashboard isAuthenticated={this.state.isAuthenticated} />
                    </Route>
                    <Route exact path="/login">
                        <Login isAuthenticated={this.state.isAuthenticated} />
                    </Route>
                    <Route exact path="/register">
                        <RegisterForm isAuthenticated={this.state.isAuthenticated} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;