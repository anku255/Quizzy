import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {
  getQuizStats,
  submitQuestionResponse,
  clearNotifications
} from '../../actions';
import StatsForm from './StatsForm';
import StatsQuestions from './StatsQuestions';
import Spinner from '../common/Spinner';

class StatsMain extends Component {
  state = {
    loading: false,
    currentPage: 1,
    category: '',
    sortBy: 'incorrectCount',
    order: 'descending'
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
    // Update loading,category, sortBy and order
    // Fetch QuizStats after the setState has executed
    let sortBy = this.state.sortBy;
    let order = this.state.order;

    if (values.sortBy) sortBy = values.sortBy;
    if (values.order) order = values.order;

    this.setState(
      {
        loading: true,
        category: values.category,
        currentPage: 1,
        sortBy,
        order
      },
      () => {
        this.props.getQuizStats(
          this.state.category,
          this.state.currentPage,
          this.state.sortBy,
          this.state.order
        );
      }
    );
  }

  // handles the click on an option of a question
  handleInputChange(e) {
    const quesId = e.target.name;
    const quesIndex = +e.target.getAttribute('data-question-index');
    const category = this.props.questions[quesIndex].questionId.category;
    const correctAnsIndex = this.props.questions[quesIndex].questionId
      .correctAnsIndex;
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

  onNextBtnClick(e) {
    e.preventDefault();

    this.setState({ loading: true });

    if (this.state.currentPage < this.props.pages) {
      const nextPage = this.state.currentPage + 1;
      this.setState({
        currentPage: nextPage
      });
      this.props.getQuizStats(
        this.state.category,
        nextPage,
        this.state.sortBy,
        this.state.order
      );
    }
  }

  onBackBtnClick(e) {
    e.preventDefault();

    this.setState({ loading: true });

    if (this.state.currentPage > 1) {
      const prevPage = this.state.currentPage - 1;
      this.setState({
        currentPage: prevPage
      });
      this.props.getQuizStats(
        this.state.category,
        prevPage,
        this.state.sortBy,
        this.state.order
      );
    }
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
          this.renderNoQuestionsFound() // Otherwise show Questions component // If loading is true then show loading
        ) : this.state.loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <h2 className="is-size-2" style={{ textAlign: 'center' }}>
              Questions
            </h2>
            <StatsQuestions
              Questions={this.props.questions}
              handleInputChange={this.handleInputChange.bind(this)}
            />
            <div
              className="field is-grouped "
              style={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
              <div className="control ">
                <button
                  className="button is-danger is-medium"
                  onClick={this.onBackBtnClick.bind(this)}
                  disabled={this.state.currentPage === 1}
                >
                  <span className="icon ">
                    <i className="fas fa-arrow-left " />
                  </span>
                  <span>Back</span>
                </button>
              </div>

              <div className="control ">
                <button
                  className="button is-success is-medium"
                  onClick={this.onNextBtnClick.bind(this)}
                  disabled={this.state.currentPage === this.props.pages}
                >
                  <span>Next</span>
                  <span className="icon ">
                    <i className="fas fa-arrow-right" />
                  </span>
                </button>
              </div>
            </div>
          </React.Fragment>
        )}
        <ToastContainer position="top-center" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.quizStats.questions,
  pages: state.quizStats.pages,
  loading: state.quizStats.loading,
  errors: state.notification.errors,
  success: state.notification.success
});

export default connect(
  mapStateToProps,
  {
    getQuizStats,
    submitQuestionResponse,
    clearNotifications
  }
)(StatsMain);
