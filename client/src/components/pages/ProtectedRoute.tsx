import React, {useEffect} from 'react';
import {Route, Redirect, RouteProps, RouteComponentProps} from 'react-router-dom';
import {RootReducer} from '../../store/root-reducer';
import {connect, ConnectedComponent, ConnectedProps} from 'react-redux';
import jwtDecode from 'jwt-decode';
import {JWTPayload} from "../../global";
import {loadUser, logout} from "../../store/auth/actions";
import {connectSocket} from "../../store/chat/actions";

type Props = {
    component: React.ComponentClass<any, any> | ConnectedComponent<any, any>;
    path: string;
    exact: boolean;
} & PropsFromStore

interface MatchParams {
    id: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
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


const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromStore = ConnectedProps<typeof connector>;

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
            if (props.socket)
                props.loadUser(props.socket);
        }
    }
}

export default connector(ProtectedRoute);
