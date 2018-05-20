import React from 'react';

const LoginRequired = props => {
  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h2 className="is-size-3">You need to login to view this page</h2>
      <a className="button is-primary" href="/auth/google">
        <span className="icon">
          <i className="fab fa-google" />
        </span>
        <span>Click here to Login</span>
      </a>
    </div>
  );
};

export default LoginRequired;
