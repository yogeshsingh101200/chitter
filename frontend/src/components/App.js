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

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem("username"),
            isAuthenticated: localStorage.getItem("token") ? true : false
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.update(), 0);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    update = () => {
        if (!localStorage.getItem("token") && this.state.isAuthenticated) {
            this.setState({
                username: null,
                isAuthenticated: false
            });
        } else if (localStorage.getItem("token") && !this.state.isAuthenticated) {
            this.setState({
                username: localStorage.getItem("username"),
                isAuthenticated: true
            });
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