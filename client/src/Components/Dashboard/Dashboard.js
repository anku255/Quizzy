import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearNotifications } from '../../actions';
import { ToastContainer, toast } from 'react-toastify';
import DashboardHeader from './DashboardHeader';
import DashboardNavigation from './DashboardNavigation';
import DashboardHistory from './DashboardHistory';

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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
  success: state.notification.success
});

export default connect(mapStateToProps, { clearNotifications })(Dashboard);
