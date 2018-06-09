import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHeader = ({ user }) => {
  const EditProfileButton = (
    <Link
      style={{ color: 'white' }}
      className="is-small"
      to="/dashboard/edit-profile"
    >
      <i className="fas fa-pencil-alt" />
    </Link>
  );

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
            <span>
              Semester: {user.semester} {EditProfileButton}{' '}
            </span>
          ) : (
            <span>Add your semester {EditProfileButton}</span>
          )}
        </h1>
        {/* Show New Question button only when user has access greater than 2 */}
        {user.accessLevel >= 2 ? (
          <Link className="button is-white is-outlined" to="/question/new">
            New Question
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
