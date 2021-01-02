import React, {useEffect} from "react";
import "./App.css";
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Landing from "./components/pages/Landing";
import {Provider} from 'react-redux';
import store from './store/store';
import ProtectedRoute from './components/pages/ProtectedRoute';
import Alert from "./components/layouts/alert/Alert";
import ChatBase from "./components/pages/ChatBase";

const App = () => {
    useEffect(() => {
    }, []);

    return (
        <React.Fragment>
            <Provider store={store}>
                <Alert />
                <Router>
                    <Switch>
                        <Route path="/" exact component={Landing} />
                        <Route path="/auth/login" exact component={Login} />
                        <Route path="/auth/register" exact component={Register} />
                        <ProtectedRoute path="/dashboard" exact component={Dashboard} />
                        <ProtectedRoute path="/chat" exact component={ChatBase} />
                    </Switch>
                </Router>
            </Provider>
        </React.Fragment>
    );
};

export default App;
