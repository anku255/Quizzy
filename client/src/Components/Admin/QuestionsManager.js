import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUnpublisehdQuestions } from '../../actions';
import Questions from './Questions';

class QuestionsManager extends Component {
  componentDidMount() {
    this.props.getUnpublisehdQuestions();
  }

  render() {
    return (
      <div className="container" style={{ margin: '20px auto' }}>
        <h2 className="is-size-2" style={{ textAlign: 'center' }}>
          Unpublished Questions
        </h2>
        <Questions Questions={this.props.questions} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.admin.questions
});

export default connect(
  mapStateToProps,
  { getUnpublisehdQuestions }
)(QuestionsManager);
