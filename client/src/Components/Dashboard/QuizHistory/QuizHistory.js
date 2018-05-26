import React, { Component } from 'react';
import Solution from '../../Quiz/Solution';

class QuizHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: this.props.location.state.questions,
      response: this.props.location.state.response
    };
  }
  render() {
    return (
      <div className="container" style={{ margin: '20px auto' }}>
        <h2 className="is-size-2" style={{ textAlign: 'center' }}>
          Answers
        </h2>
        <Solution
          currentQuiz={this.state.questions}
          response={this.state.response}
        />
      </div>
    );
  }
}

export default QuizHistory;
