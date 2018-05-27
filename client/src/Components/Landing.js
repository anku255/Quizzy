import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
  renderNavLinks() {
    if (this.props.user === false) {
      return (
        <span className="navbar-item">
          <a className="button is-white is-outlined" href="/auth/google">
            <span className="icon">
              <i className="fab fa-google" />
            </span>
            <span>Sign In With Google</span>
          </a>
        </span>
      );
    }
  }

  renderButton() {
    switch (this.props.user) {
      case null:
        return;
      case false:
        return (
          <a className="button is-white is-outlined" href="/auth/google">
            <span className="icon">
              <i className="fab fa-google" />
            </span>
            <span>Get Started</span>
          </a>
        );

      default:
        return (
          <a className="button is-white is-outlined" href="/dashboard">
            <span>Go to Dashboard</span>
            <span className="icon">
              <i className="fas fa-arrow-right" />
            </span>
          </a>
        );
    }
  }
  render() {
    return (
      <section className="hero is-info is-fullheight">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <a className="navbar-item" href="../">
                  <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    QUIZZY
                  </span>
                </a>
                <span className="navbar-burger burger" data-target="navbarMenu">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <div id="navbarMenu" className="navbar-menu">
                <div className="navbar-end">{this.renderNavLinks()}</div>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-6 is-offset-3">
              <h1 className="title">Welcome to Quizzy!!</h1>
              <h2 className="subtitle">
                This is a platform where we will learn and share knowledge
                together. Let's make studying fun again!
              </h2>
              {this.renderButton()}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(mapStateToProps)(Landing);
