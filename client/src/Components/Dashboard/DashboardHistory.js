import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getQuizHistory } from '../../actions';
import Spinner from '../common/Spinner';

class DashboardHistory extends Component {
  componentDidMount() {
    this.props.getQuizHistory();
  }
  render() {
    let cardContent;

    if (this.props.loading) {
      cardContent = <Spinner />;
    } else {
      if (!this.props.quizzes) {
        cardContent = <div>No Quiz History found!</div>;
      } else {
        cardContent = (
          <aside className="menu">
            <ul className="menu-list">
              {this.props.quizzes.map((quiz, i) => {
                return (
                  <li key={quiz._id}>
                    <Link
                      to={{
                        pathname: '/dashboard/quiz-history',
                        state: {
                          questions: quiz.questions,
                          response: this.props.userResponses[i]
                        }
                      }}
                      style={{ color: '#423ecf', fontWeight: 600 }}
                    >
                      Quiz {i + 1} taken on{' '}
                      {new Date(quiz.startTime).toLocaleString()}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        );
      }
    }

    return (
      <div className="card" style={{ width: '100%', margin: '20px 0' }}>
        <header className="card-header">
          <p className="is-size-4" style={{ margin: '0 auto' }}>
            Quiz History
          </p>
        </header>
        <div className="card-content">{cardContent}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quizzes: state.quizHistory.quizzes,
  userResponses: state.quizHistory.userResponses,
  loading: state.quizHistory.loading
});

export default connect(mapStateToProps, { getQuizHistory })(DashboardHistory);
