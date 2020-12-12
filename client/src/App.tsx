import React from "react";
import "./App.css";
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Landing from "./components/pages/Landing";

const App = () => {
    return (
        <React.Fragment>
            <Router>
                <Switch>
                    <Route path="/auth/login" exact component={Login} />
                    <Route path="/auth/register" exact component={Register} />
                    <Route path="/" exact component={Landing} />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

export default App;
