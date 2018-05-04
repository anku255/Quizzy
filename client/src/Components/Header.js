import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import RaisedButton from 'material-ui/RaisedButton';

class Header extends Component {
  renderNavLinks() {
    switch (this.props.user) {
      case null:
        return;
      case false:
        return (
          <ToolbarGroup>
            <RaisedButton
              label="Login With Google"
              secondary={true}
              href="/auth/google"
            />
          </ToolbarGroup>
        );
      default:
        return (
          <ToolbarGroup>
            <RaisedButton
              label={this.props.user.name}
              secondary={true}
              href="#"
            />
            <RaisedButton label="Logout" href="/api/logout" />
          </ToolbarGroup>
        );
    }
  }
  render() {
    return <AppBar title="Quizzy" iconElementRight={this.renderNavLinks()} />;
  }
}

function mapStateToProps(state) {
  return { user: state.auth };
}

export default connect(mapStateToProps)(Header);
