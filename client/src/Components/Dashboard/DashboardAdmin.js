import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashboardAdmin extends Component {
  render() {
    return (
      <div className="card" style={{ width: '100%', margin: '20px 0' }}>
        <header className="card-header">
          <p className="is-size-4" style={{ margin: '0 auto' }}>
            Admin Actions
          </p>
        </header>
        <div className="card-content">
          <aside className="menu">
            <ul className="menu-list">
              <li key="question">
                <Link
                  to="/admin/questions"
                  style={{ color: '#0c202e', fontWeight: 600 }}
                >
                  Manage Questions
                </Link>
              </li>
              <li key="quiz">
                <Link
                  to="/admin/quizzes"
                  style={{ color: '#0c202e', fontWeight: 600 }}
                >
                  Manage Quizzes
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    );
  }
}

export default DashboardAdmin;
