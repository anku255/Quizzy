import React from 'react';
import { Route } from 'react-router-dom';

const LoginComponent = props => {
  return (
    <div>
      You need to login to view this page.
      <a href="/auth/google">Click Here to Login</a>
    </div>
  );
};

const PrivateRoute = ({ user, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        Boolean(user) ? (
          <Component {...props} />
        ) : (
          <LoginComponent from={props.location} />
        )
      }
    />
  );
};

export default PrivateRoute;
