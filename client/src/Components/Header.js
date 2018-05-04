import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

// CSS
const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 30
  }
};

class Header extends Component {
  renderNavlinks() {
    switch (this.props.user) {
      case null:
        return;
      case false:
        return (
          <Button
            variant="raised"
            color="secondary"
            style={styles.menuButton}
            href="/auth/google"
          >
            Login With Google
          </Button>
        );
      default:
        return [
          <Button
            key="1"
            variant="raised"
            color="secondary"
            style={styles.menuButton}
            href="#"
          >
            Profile
          </Button>,
          <Button
            key="2"
            variant="raised"
            color="inherit"
            style={styles.menuButton}
            href="/api/logout"
          >
            Logout
          </Button>
        ];
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" style={styles.flex}>
              Quizzy
            </Typography>
            {this.renderNavlinks()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth
  };
}
export default connect(mapStateToProps)(Header);
