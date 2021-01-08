import React, {useEffect} from 'react';
import {Route, Redirect, RouteProps, RouteComponentProps} from 'react-router-dom';
import {RootReducer} from '../../store/root-reducer';
import {connect, ConnectedComponent} from 'react-redux';
import jwtDecode from 'jwt-decode';
import {JWTPayload} from "../../global";
import {loadUser, logout} from "../../store/auth/actions";
import {connectSocket} from "../../store/chat/actions";

type Props = {
    component: React.ComponentClass<any, any> | ConnectedComponent<any, any>;
    path: string;
    exact: boolean;
    isAuthenticated?: boolean;
    isLoaded?: boolean;
    socket?: SocketIOClient.Socket | null;
} & DispatchProps;

type DispatchProps = {
    logout: () => void;
    loadUser: (...args: Parameters<typeof loadUser>) => void;
    connectSocket: (...args: Parameters<typeof connectSocket>) => void;
}

interface MatchParams {
    id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

const ProtectedRoute: React.FC<Props> = (props) => {
    useEffect(() => {
        if (!props.socket)
            props.connectSocket();
        checkAuth(props);
    }, [props.socket]);


    if (props.isAuthenticated) {
        return (
            <Route path={props.path} exact={props.exact} render={({match}: MatchProps) => (<props.component id={match.params.id} />)} />
        );
    } else {
        return (
            <Redirect to="/auth/login" />
        )
    }
}

const checkAuth = (props: Props) => {
    let token = localStorage.getItem("token");
    if (token) {
        let decoded = jwtDecode<JWTPayload>(token);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            props.logout();
        } else if (props.isLoaded !== undefined && !props.isLoaded) {
            console.log("IS NOT LOADED", props);
            if (props.socket)
                props.loadUser(props.socket);
        }
    }
}

const mapStateToProps = (state: RootReducer) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isLoaded: state.auth.isLoaded,
        socket: state.chat.socket
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => {dispatch(logout())},
        loadUser: (socket: SocketIOClient.Socket) => {dispatch(loadUser(socket))},
        connectSocket: () => {dispatch(connectSocket())},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
