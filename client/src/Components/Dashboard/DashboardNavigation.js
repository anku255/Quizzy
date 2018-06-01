import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { categoriesArray } from '../common/selectValues';

class DashboardNavigation extends Component {
  render() {
    return (
      <div className="card" style={{ width: '100%', margin: '20px 0' }}>
        <header className="card-header">
          <p className="is-size-4" style={{ margin: '0 auto' }}>
            Browse Questions by Category
          </p>
        </header>
        <div className="card-content">
          <aside className="menu">
            <ul className="menu-list">
              <li key="current">
                <Link
                  to="/current"
                  style={{ color: '#0c202e', fontWeight: 600 }}
                >
                  Current Quiz
                </Link>
              </li>
              {categoriesArray.map(category => (
                <li key={category}>
                  <Link
                    to={`/questions/${category}/1`}
                    style={{ color: '#0c202e', fontWeight: 600 }}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    );
  }
}

export default DashboardNavigation;
