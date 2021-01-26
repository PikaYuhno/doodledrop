import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Import components
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import Landing from "./components/pages/Landing";
import ProtectedRoute from './components/pages/ProtectedRoute';
import Alert from "./components/layouts/alert/Alert";
import ChatBase from "./components/pages/ChatBase";
import About from './components/pages/About';
import Contributers from './components/pages/Contributors';
import Search from "./components/pages/Search";
import Profile from "./components/pages/Profile";
import UserProfile from './components/pages/UserProfile';
import MainCanvas from './components/pages/MainCanvas';

const App: React.FC = () => {
    return (
        <React.Fragment>
            <Alert />
            <Router>
                <Switch>
                    <Route path="/about" exact component={About} />
                    <Route path="/coutributors" exact component={Contributers} />
                    <Route path="/" exact component={Landing} />
                    <Route path="/auth/login" exact component={Login} />
                    <Route path="/auth/register" exact component={Register} />
                    <ProtectedRoute path="/dashboard" exact component={Dashboard} />
                    <ProtectedRoute path="/search" exact component={Search} />
                    <ProtectedRoute path="/profile/:id" exact component={Profile} />
                    <ProtectedRoute path="/profile" exact component={UserProfile} />
                    <ProtectedRoute path="/chat" exact component={ChatBase} />
                    <ProtectedRoute path="/canvas" exact component={MainCanvas} />
                </Switch>
            </Router>
        </React.Fragment>
    );
};

export default App;
