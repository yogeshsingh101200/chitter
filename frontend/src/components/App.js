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

    authenticate = () => {
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

    };

    componentDidMount() {
        this.timerID = setInterval(() => this.update(), 0);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    update = () => {
        if (!localStorage.getItem("token") && this.state.isAuthenticated)
            this.setState({ user: null, isAuthenticated: false });
        else if (localStorage.getItem("token") && !this.state.isAuthenticated)
            this.authenticate();
    };

    render() {
        return (
            <Router>
                <Header
                    isAuthenticated={this.state.isAuthenticated}
                    user={this.state.user}
                />
                <Switch>
                    <Route exact path="/">
                        <Dashboard isAuthenticated={this.state.isAuthenticated} user={this.state.user} />
                    </Route>
                    <Route exact path="/login">
                        <Login isAuthenticated={this.state.isAuthenticated} />
                    </Route>
                    <Route exact path="/register">
                        <Register isAuthenticated={this.state.isAuthenticated} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;