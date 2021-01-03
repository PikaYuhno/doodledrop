import React, {useEffect} from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {RootReducer} from '../../store/root-reducer';
import {connect, ConnectedComponent} from 'react-redux';
import jwtDecode from 'jwt-decode';
import {JWTPayload} from "../../global";
import {loadUser, logout} from "../../store/auth/actions";

type Props = {
    component: React.ComponentClass<any, any> | ConnectedComponent<any, any>;
    path: string;
    exact: boolean;
    isAuthenticated?: boolean;
} & DispatchProps;

type DispatchProps = {
    logout: () => void;
    loadUser: () => void;
}


const ProtectedRoute: React.FC<Props> = (props) => {
    useEffect(() => {
        checkAuth(props);
    }, []);

    if (props.isAuthenticated) {
        return (
            <Route exact={props.exact} component={props.component} path={props.path} />
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
        } else {
            props.loadUser();
        }
    }
}

const mapStateToProps = (state: RootReducer) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => {dispatch(logout())},
        loadUser: () => {dispatch(loadUser())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
