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
import jwtDecode from 'jwt-decode';
import {JWTPayload} from "./global";
import {loadUser, logout} from "./store/auth/actions";

const App = () => {
    useEffect(() => {
        console.log("AÖSLFKJAÖLFKJ");
        checkAuth();
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
                    </Switch>
                </Router>
            </Provider>
        </React.Fragment>
    );
};

const checkAuth = () => {
    let token = localStorage.getItem("token");
    if (token) {
        let decoded = jwtDecode<JWTPayload>(token);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            // TODO: FIX THIS TYPE ERROR
            let logOut: any = logout();
            store.dispatch(logOut);
        } else {
            let load: any = loadUser();
            store.dispatch(load);
        }
    }
}

export default App;
