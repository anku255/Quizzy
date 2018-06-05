import React from 'react';
import { Route } from 'react-router-dom';
import LoginRequired from './LoginRequired';
import AccessDenied from './AccessDenied';

const renderFunction = (props, Component, user, RequiredAccessLevel) => {
  switch (user) {
    case null:
      return null;
    case false:
      return <LoginRequired />;
    default:
      if (!RequiredAccessLevel || user.accessLevel >= RequiredAccessLevel)
        return <Component {...props} />;
      else return <AccessDenied />;
  }
};

const PrivateRoute = ({
  user,
  RequiredAccessLevel,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        renderFunction(props, Component, user, RequiredAccessLevel)
      }
    />
  );
};

export default PrivateRoute;
