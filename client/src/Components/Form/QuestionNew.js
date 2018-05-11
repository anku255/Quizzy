// This will act as a parent component to both
// QuestionForm and QuestionFormReview Components

import React, { Component } from 'react';
import QuestionForm from './QuestionForm';
import QuestionFormReview from './QuestionFormReview';
import { reduxForm } from 'redux-form';

class QuestionNew extends Component {
  state = { showFormReview: false };

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
    return <div>{this.renderContent()}</div>;
  }
}

// Adding reduxForm here assures that the
// form gets cleared when user presses the
// cancel button
export default reduxForm({
  form: 'questionForm'
})(QuestionNew);
