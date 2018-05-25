import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { submitQuizResponse } from '../../actions';
import Solution from './Solution';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuiz: this.props.location.state.currentQuiz,
      response: this.props.location.state.response
    };
  }
  /**
   * @returns an array of objects. Each object of
   * the form {quesId, correctAnswer, incorrectAnswer}.
   *
   * This array of object will be sent to server.
   */
  evalResponse() {
    const result = [];
    const currentQuiz = this.state.currentQuiz;
    const response = this.state.response;
    for (let i = 0; i < currentQuiz.length; i++) {
      let question = currentQuiz[i];
      let correctAnswer = question.correctAnsIndex === +response[question._id];
      let incorrectAnswer =
        question.correctAnsIndex !== +response[question._id];

      result.push({
        quesId: question._id,
        category: question.category,
        correctAnswer,
        incorrectAnswer
      });
    }

    return result;
  }

  componentWillReceiveProps(nextProps) {
    const { submissonError } = nextProps.errors;
    if (submissonError) {
      return toast.error(submissonError);
    }

    const { submissionSuccess } = nextProps.success;
    if (submissionSuccess) {
      return toast.success(submissionSuccess);
    }
  }

  componentDidMount = () => {
    const result = this.evalResponse();
    // call the action for sending response to server
    this.props.submitQuizResponse(result);
    this.setState({
      responseSubmitted: true
    });
  };

  render() {
    return (
      <div className="container" style={{ margin: '20px auto' }}>
        <h2 className="is-size-2" style={{ textAlign: 'center' }}>
          Answers
        </h2>
        <Solution
          currentQuiz={this.state.currentQuiz}
          response={this.state.response}
        />
        <ToastContainer position="top-center" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.notification.errors,
  success: state.notification.success
});

export default connect(mapStateToProps, { submitQuizResponse })(Answers);
