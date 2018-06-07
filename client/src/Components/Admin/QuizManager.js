import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuizzes } from '../../actions';
import Quizzes from './Quizzes';
import Spinner from '../common/Spinner';

class QuizManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.getQuizzes();
  }

  componentWillReceiveProps(nextProps) {
    // Map loading prop to state
    this.setState({ loading: nextProps.loading });
  }

  render() {
    return (
      <div className="container" style={{ margin: '20px auto' }}>
        <h2 className="is-size-2" style={{ textAlign: 'center' }}>
          Quizzes
        </h2>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <Quizzes quizzes={this.props.quizzes} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quizzes: state.admin.quizzes,
  loading: state.admin.loading
});

export default connect(
  mapStateToProps,
  { getQuizzes }
)(QuizManager);
