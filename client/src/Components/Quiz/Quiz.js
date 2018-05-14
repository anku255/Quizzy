import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';
import Question from './Question';

const classes = {
  isCentered: {
    display: 'flex',
    justifyContent: 'center'
  }
};

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount = () => {
    this.props.fetchCurrentQuiz();
  };

  handleInputChange(event) {
    const choiceIndex = event.target.getAttribute('data-choice-index');
    const quesId = event.target.getAttribute('data-question-id');

    this.setState(prevState => {
      return {
        response: { ...prevState.response, [quesId]: choiceIndex }
      };
    });
  }

  render() {
    return (
      <div className="container" style={{ margin: '20px auto' }}>
        <h2 className="is-size-2" style={{ textAlign: 'center' }}>
          Current Quiz
        </h2>
        {this.props.loading ? (
          <div>Loading</div>
        ) : (
          <div>
            <Question
              currentQuiz={this.props.currentQuiz}
              handleInputChange={this.handleInputChange}
            />
            <div style={classes.isCentered}>
              <Link
                className="button is-primary"
                to={{
                  pathname: '/current/answers',
                  state: {
                    response: this.state.response,
                    currentQuiz: this.props.currentQuiz
                  }
                }}
              >
                Submit
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentQuiz: state.quiz.currentQuiz,
    loading: state.quiz.loading
  };
}

export default connect(mapStateToProps, actions)(Quiz);
