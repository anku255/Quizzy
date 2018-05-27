import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuizStats } from '../../actions';
import StatsForm from './StatsForm';

class StatsMain extends Component {
  onSubmit(values) {
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.quizStats
});

export default connect(mapStateToProps, { getQuizStats })(StatsMain);
