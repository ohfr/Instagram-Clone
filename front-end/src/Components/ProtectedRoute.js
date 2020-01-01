import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../Utils/api';

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={(renderProps) => getToken() ? <Component {...renderProps} /> : <Redirect to="/login" />}/>
    );
};

export default ProtectedRoute;