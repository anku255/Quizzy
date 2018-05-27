import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderNavlinks() {
    switch (this.props.user) {
      case null:
        return;
      case false:
        return (
          <p className="control">
            <a className="button is-danger" href="/auth/google">
              <span className="icon">
                <i className="fab fa-google" />
              </span>
              <span>Login With Google</span>
            </a>
          </p>
        );
      default:
        return [
          <p key="1" className="control">
            <Link className="button is-warning" to="/stats">
              <span className="icon">
                <i className="fas fa-file-alt" />
              </span>
              <span>Stats</span>
            </Link>
          </p>,
          <p key="2" className="control">
            <Link className="button is-warning" to="/dashboard">
              <span className="icon">
                <i className="fas fa-user-circle" />
              </span>
              <span>Dashboard</span>
            </Link>
          </p>,
          <p key="3" className="control">
            <a className="button is-light" href="/api/logout">
              <span className="icon">
                <i className="fas fa-sign-out-alt" />
              </span>
              <span>Logout</span>
            </a>
          </p>
        ];
    }
  }

  render() {
    return (
      <nav className="navbar is-link">
        <div className="navbar-brand">
          <Link
            className="navbar-item"
            to="/dashboard"
            style={{ fontWeight: 'bold', fontSize: '20px' }}
          >
            Quizzy
          </Link>
          <div className="navbar-burger burger" data-target="navMenu">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="navMenu" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">{this.renderNavlinks()}</div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
