import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {
  getQuizStats,
  submitQuestionResponse,
  clearNotifications
} from '../../actions';
import StatsForm from './StatsForm';
import Questions from '../Questions/Questions';
import Spinner from '../common/Spinner';

class StatsMain extends Component {
  state = {
    loading: false
  };

  componentWillReceiveProps(nextProps) {
    // Map loading prop to state
    this.setState({ loading: nextProps.loading });

    // Handle notifications
    const { submissionSuccess } = nextProps.success;
    if (submissionSuccess) {
      toast.success(submissionSuccess);
      return this.props.clearNotifications();
    }

    if (Object.keys(nextProps.errors).length > 0) {
      toast.error(JSON.stringify(nextProps.errors));
      return this.props.clearNotifications();
    }
  }

  // handles the submission of form
  onSubmit(values) {
    // Set loading to true
    this.setState({ loading: true });

    // This query object will be sent to the server
    const query = {
      params: {}
    };
    const { correctCount } = values;
    const { incorrectCount } = values;
    if (correctCount) query.params.correctCount = correctCount;
    if (incorrectCount) query.params.incorrectCount = incorrectCount;
    query.params.category = values.category;

    this.props.getQuizStats(query);
  }

  // handles the click on an option of a question
  handleInputChange(e) {
    const quesId = e.target.name;
    const quesIndex = +e.target.getAttribute('data-question-index');
    const category = this.props.questions[quesIndex].category;
    const correctAnsIndex = this.props.questions[quesIndex].correctAnsIndex;
    const userClickedIndex = +e.target.getAttribute('data-choice-index');

    // create a response object for this question
    const userResponse = {
      quesId,
      category,
      correctAnswer: false
    };

    const labels = document.querySelectorAll(`label[name='${quesId}']`);

    labels.forEach((e, i) => {
      // If i is equal to correctAnsIndex then add correctAns class
      if (i === correctAnsIndex) {
        // check if i also equal to userClickedIndex
        if (i === userClickedIndex) {
          // make correctAnswer to true in userResponse
          userResponse.correctAnswer = true;
        }
        return e.classList.add('correctAns', 'no-pointer-events');
      }

      // If i is equal to userClickedIndex then add incorrectAns class
      if (i === userClickedIndex) {
        return e.classList.add('incorrectAns', 'no-pointer-events');
      }

      return e.classList.add('no-pointer-events');
    });

    // Find the footer by quesID
    const footer = document.getElementById(quesId);
    // remove class hidden from the footer
    footer.classList.remove('hidden');

    // Call the action to submit question response
    this.props.submitQuestionResponse(userResponse);
  }

  // Displays No questions found card
  renderNoQuestionsFound() {
    return (
      <div className="card" style={{ width: '100%', margin: '40px 0' }}>
        <header className="card-header">
          <p className="is-size-5" style={{ margin: '0 auto', color: 'red' }}>
            No Questions Found
          </p>
        </header>
      </div>
    );
  }

  render() {
    return (
      <div className="container" style={{ margin: '20px auto' }}>
        <div className="card" style={{ width: '100%', margin: '20px 0' }}>
          <header className="card-header">
            <p className="is-size-4" style={{ margin: '0 auto' }}>
              Quiz Stats
            </p>
          </header>
          <div className="card-content">
            <StatsForm onSubmit={this.onSubmit.bind(this)} />
          </div>
        </div>
        {/* Nested Ternary!!!
          If questions array is empty and loading is false then
          show NoQuestionFound card
        */}
        {this.props.questions.length === 0 && !this.state.loading ? (
          this.renderNoQuestionsFound() // If loading is true then show loading
        ) : // Otherwise show Questions component
        this.state.loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <h2 className="is-size-2" style={{ textAlign: 'center' }}>
              Questions
            </h2>
            <Questions
              currentQuiz={this.props.questions}
              handleInputChange={this.handleInputChange.bind(this)}
            />
          </React.Fragment>
        )}
        <ToastContainer position="top-center" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.quizStats.questions,
  loading: state.quizStats.loading,
  errors: state.notification.errors,
  success: state.notification.success
});

export default connect(mapStateToProps, {
  getQuizStats,
  submitQuestionResponse,
  clearNotifications
})(StatsMain);
