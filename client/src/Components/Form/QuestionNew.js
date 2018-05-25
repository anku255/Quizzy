// This will act as a parent component to both
// QuestionForm and QuestionFormReview Components

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ToastContainer, toast } from 'react-toastify';
import { clearNotifications } from '../../actions';
import QuestionForm from './QuestionForm';
import QuestionFormReview from './QuestionFormReview';

class QuestionNew extends Component {
  state = { showFormReview: false };

  componentWillReceiveProps(nextProps) {
    const { quesSubmissionError } = nextProps.errors;
    if (quesSubmissionError) {
      toast.error(quesSubmissionError);
      return this.props.clearNotifications();
    }

    const { quesSubmissionSuccess } = nextProps.success;
    if (quesSubmissionSuccess) {
      toast.success(quesSubmissionSuccess);
      return this.props.clearNotifications();
    }
  }

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <QuestionFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <QuestionForm
        onQuestionSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  render() {
    return (
      <div>
        {this.renderContent()}
        <ToastContainer position="top-center" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.notification.errors,
  success: state.notification.success
});

// Adding reduxForm here assures that the
// form gets cleared when user presses the
// cancel button
export default connect(mapStateToProps, { clearNotifications })(
  reduxForm({
    form: 'questionForm'
  })(QuestionNew)
);
