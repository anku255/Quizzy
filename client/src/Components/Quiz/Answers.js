import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Solution from './Solution';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuiz: this.props.location.state.currentQuiz,
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
          currentQuiz={this.state.currentQuiz}
          response={this.state.response}
        />
      </div>
    );
  }
}

export default connect(null, actions)(Answers);
