import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentQuiz } from '../../actions';
import Questions from './Questions';
import Spinner from '../common/Spinner';

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
      response: {},
      modalTitle: '',
      modalMessage: '',
      isSubmitDisabled: true
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

  onSubmit(e) {
    e.preventDefault();

    // Check if user has marked all the questions
    if (
      Object.keys(this.state.response).length !== this.props.currentQuiz.length
    ) {
      this.setState({
        modalTitle: 'Oops!',
        modalMessage:
          'Looks like you missed to answer some question(s). Click on the Cancel button and take a look again.'
      });
    } else {
      this.setState({
        modalTitle: 'Confirmation Required!',
        modalMessage:
          'Are you sure you want to submit your response? You will not be able to submit this quiz again.',
        isSubmitDisabled: false
      });
    }

    // Show the modal
    this.toggleModal();
  }

  toggleModal() {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('is-active');
  }

  renderModal() {
    return (
      <div className="modal">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.state.modalTitle}</p>
          </header>
          <section className="modal-card-body">
            {this.state.modalMessage}
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-danger"
              onClick={() => this.toggleModal()}
            >
              Cancel
            </button>
            <button
              className="button is-success"
              disabled={this.state.isSubmitDisabled}
              onClick={() => {
                this.props.history.push({
                  pathname: '/current/answers',
                  state: {
                    response: this.state.response,
                    currentQuiz: this.props.currentQuiz
                  }
                });
              }}
            >
              Submit
            </button>
          </footer>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container" style={{ margin: '20px auto' }}>
        <h2 className="is-size-2" style={{ textAlign: 'center' }}>
          Current Quiz
        </h2>
        {this.renderModal()}
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div>
            <Questions
              currentQuiz={this.props.currentQuiz}
              handleInputChange={this.handleInputChange}
            />
            <div style={classes.isCentered}>
              <button
                className="button is-primary"
                onClick={this.onSubmit.bind(this)}
              >
                Submit
              </button>
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

export default connect(
  mapStateToProps,
  { fetchCurrentQuiz }
)(Quiz);
