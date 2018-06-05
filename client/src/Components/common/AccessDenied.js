import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied = props => {
  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h2 className="is-size-3">
        You don't have permission to view this page.
      </h2>
      <Link to="/dashboard" className="button is-outlined">
        <span className="icon">
          <i className="fas fa-user-circle" />
        </span>
        <span>Go to Dashboard</span>
      </Link>
    </div>
  );
};

export default AccessDenied;
