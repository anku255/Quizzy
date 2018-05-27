import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuizStats, submitQuestionResponse } from '../../actions';
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
    // TODO
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
          this.renderNoQuestionsFound()
        ) : // If loading is true then show loading
        // Otherwise show Questions component
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.quizStats.questions,
  loading: state.quizStats.loading
});

export default connect(mapStateToProps, {
  getQuizStats,
  submitQuestionResponse
})(StatsMain);
