import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearNotifications } from '../../actions';
import { ADMIN_LEVEL } from '../../constants/accessLevel';
import { ToastContainer, toast } from 'react-toastify';
import DashboardHeader from './DashboardHeader';
import DashboardNavigation from './DashboardNavigation';
import DashboardHistory from './DashboardHistory';
import DashboardAdmin from './DashboardAdmin';

class Dashboard extends Component {
  componentWillReceiveProps(nextProps) {
    const { profileUpdated } = nextProps.success;
    if (profileUpdated) {
      toast.success(profileUpdated);
      return this.props.clearNotifications();
    }
  }

  render() {
    return (
      <div className="container" style={{ padding: '10px' }}>
        <ToastContainer position="top-center" />
        <DashboardHeader user={this.props.user} />
        <DashboardNavigation />
        <DashboardHistory />
        {this.props.user.accessLevel >= ADMIN_LEVEL ? <DashboardAdmin /> : ''}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  success: state.notification.success
});

export default connect(
  mapStateToProps,
  { clearNotifications }
)(Dashboard);
