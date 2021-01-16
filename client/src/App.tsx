import React, {useEffect} from "react";
import "./App.css";
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Landing from "./components/pages/Landing";
import ProtectedRoute from './components/pages/ProtectedRoute';
import Alert from "./components/layouts/alert/Alert";
import ChatBase from "./components/pages/ChatBase";
import {connectSocket, disconnectSocket} from './store/chat/actions';
import {connect} from 'react-redux';
import {RootReducer} from "./store/root-reducer";
import About from './components/pages/About';
import Contributers from './components/pages/Contributors';
import Search from "./components/pages/Search";
import Profile from "./components/pages/Profile";
import UserProfile from './components/pages/UserProfile';
import MainCanvas from './components/pages/MainCanvas';

type AppProps = {
    socket?: SocketIOClient.Socket | null
} & DispatchProps

type DispatchProps = {
    connectSocket: (...args: Parameters<typeof connectSocket>) => void;
    disconnectSocket: (...args: Parameters<typeof disconnectSocket>) => void;
}
const App: React.FC<AppProps> = (props) => {
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

const mapStateToProps = (state: RootReducer) => {
    return {
        state: state.chat.socket,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        connectSocket: () => {dispatch(connectSocket())},
        disconnectSocket: (...args: Parameters<typeof disconnectSocket>) => {dispatch(disconnectSocket(...args))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
