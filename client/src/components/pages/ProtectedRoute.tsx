import React, {Component} from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';
import {RootReducer} from '../../store/root-reducer';
import {connect} from 'react-redux';

interface Props extends RouteProps {
    component: React.ComponentClass<any, any>;
    path: string;
    exact: boolean;
    isAuthenticated?: boolean;
}
const ProtectedRoute: React.FC<Props> = (props) => {

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

const mapStateToProps = (state: RootReducer) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps)(ProtectedRoute);
