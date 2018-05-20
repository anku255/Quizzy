import React from 'react';
import { Route } from 'react-router-dom';
import LoginRequired from './LoginRequired';

const PrivateRoute = ({ user, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        Boolean(user) ? (
          <Component {...props} />
        ) : (
          <LoginRequired from={props.location} />
        )
      }
    />
  );
};

export default PrivateRoute;
