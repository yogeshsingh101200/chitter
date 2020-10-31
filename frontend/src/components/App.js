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
    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route exact path="/register">
                        <RegisterForm />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;