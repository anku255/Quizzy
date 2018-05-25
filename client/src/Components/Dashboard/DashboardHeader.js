import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHeader = ({ user }) => {
  return (
    <div
      className="card"
      style={{
        width: '100%',
        backgroundColor: '#17a2b8',
        textAlign: 'center',
        color: 'white'
      }}
    >
      <div className="card-content">
        <figure className="image is-128x128" style={{ margin: '0 auto' }}>
          <img
            style={{ borderRadius: '50%' }}
            alt="avatar"
            src={`https://api.adorable.io/avatars/285/${user.email}`}
          />
        </figure>
        <h1 className="is-size-2">{user.name}</h1>
        <h1 className="is-size-5">{user.email}</h1>
        <h1 className="is-size-6">
          {user.semester ? (
            <span>Semester: {user.semester}</span>
          ) : (
            <span>Add your semester</span>
          )}
        </h1>
        <Link className="button is-small" to="/dashboard/edit-profile">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
