import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardHeader from './DashboardHeader';

class Dashboard extends Component {
  render() {
    return (
      <div className="container" style={{ padding: '10px' }}>
        <DashboardHeader user={this.props.user} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth
});

export default connect(mapStateToProps)(Dashboard);
