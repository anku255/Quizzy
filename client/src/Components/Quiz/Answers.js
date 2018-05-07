import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuiz: this.props.location.state.currentQuiz,
      response: this.props.location.state.response,
      responseSubmitted: false
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

  componentDidMount = () => {
    if (!this.state.responseSubmitted) {
      const result = this.evalResponse();
      // call the action for sending response to server
      this.props.submitQuizResponse(result);
      this.setState({
        responseSubmitted: true
      });
    }
  };

  render() {
    return <div>Answers Component</div>;
  }
}

export default connect(null, actions)(Answers);
