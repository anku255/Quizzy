import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {
  getQuestions,
  submitQuestionResponse,
  clearNotifications
} from '../../actions';
import Questions from './Questions';
import Spinner from '../common/Spinner';

class QuestionsMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      currentPage: 1
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    // Get category and page
    const category = this.props.match.params.category;
    const page = this.props.match.params.page;
    // Update category in state
    this.setState({
      category,
      currentPage: +page
    });
    this.props.getQuestions(category, page);
  }

  componentWillReceiveProps(nextProps) {
    // If no of pages is smaller than this.state.currentPage
    // then change currentPage to no of pages

    if (nextProps.pages < this.state.currentPage) {
      this.setState({
        currentPage: nextProps.pages
      });
    }

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

  onNextBtnClick(e) {
    e.preventDefault();

    if (this.state.currentPage < this.props.pages) {
      const nextPage = this.state.currentPage + 1;
      this.setState({
        currentPage: nextPage
      });
      this.props.getQuestions(this.state.category, nextPage);
    }
  }

  onBackBtnClick(e) {
    e.preventDefault();

    if (this.state.currentPage > 1) {
      const prevPage = this.state.currentPage - 1;
      this.setState({
        currentPage: prevPage
      });
      this.props.getQuestions(this.state.category, prevPage);
    }
  }

  render() {
    return (
      <div className="container" style={{ margin: '20px auto' }}>
        <h2 className="is-size-2" style={{ textAlign: 'center' }}>
          {this.state.category}
        </h2>{' '}
        <h2 className="is-size-5" style={{ textAlign: 'center' }}>
          {`Current Page: ${this.state.currentPage}`}
        </h2>{' '}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div className="container">
            <Questions
              currentQuiz={this.props.questions}
              handleInputChange={this.handleInputChange}
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
          </div>
        )}
        <ToastContainer position="top-center" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.question.questions,
  pages: +state.question.pages,
  loading: state.question.loading,
  errors: state.notification.errors,
  success: state.notification.success
});

export default connect(mapStateToProps, {
  getQuestions,
  submitQuestionResponse,
  clearNotifications
})(QuestionsMain);
