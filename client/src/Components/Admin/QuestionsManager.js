import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUnpublisehdQuestions } from '../../actions';
import Questions from './Questions';
import QuizFormModal from './QuizFormModal';

class QuestionsManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedQuestions: {}
    };

    this.onSelectQuestion = this.onSelectQuestion.bind(this);
    this.handleQuizFormSubmit = this.handleQuizFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getUnpublisehdQuestions();
  }

  onSelectQuestion(e, quesId) {
    e.preventDefault();
    const card = document.getElementById(quesId);

    this.toggleSelection(quesId);

    card.classList.toggle('selected-card');
  }

  toggleSelection(quesId) {
    let selected = true;
    if (this.state.selectedQuestions[quesId]) {
      selected = false;
    }
    this.setState(prevState => ({
      selectedQuestions: { ...prevState.selectedQuestions, [quesId]: selected }
    }));
  }

  toggleModal() {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('is-active');
  }

  onSubmit(e) {
    e.preventDefault();
    this.toggleModal();
  }

  handleQuizFormSubmit(e, value) {
    e.preventDefault();

    // Create an array quesIds of selected questions
    const { selectedQuestions } = this.state;
    const questions = Object.keys(selectedQuestions).filter(
      key => selectedQuestions[key]
    );

    const quizData = { ...value, questions };
    // TODO: Sent quizData to the server
    // TODO: call toggleModal
  }

  render() {
    return (
      <div className="container" style={{ margin: '20px auto' }}>
        <h2 className="is-size-2" style={{ textAlign: 'center' }}>
          Unpublished Questions
        </h2>
        <QuizFormModal
          toggleModal={this.toggleModal}
          handleSubmit={this.handleQuizFormSubmit}
        />
        <Questions
          Questions={this.props.questions}
          onSelectQuestion={this.onSelectQuestion}
        />
        <div className="is-centered">
          <button
            className="button is-primary"
            onClick={this.onSubmit.bind(this)}
          >
            Submit
          </button>
        </div>
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
