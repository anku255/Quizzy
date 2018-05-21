import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../../actions';
import Questions from './Questions';
import Spinner from '../common/Spinner';

class QuestionsMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      prevPage: 1,
      nextPage: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    // Get category and page
    const category = this.props.match.params.category;
    const page = this.props.match.params.page;
    // Update category in state
    this.setState({
      category
    });
    this.props.getQuestions(category, page);
  }

  handleInputChange(e) {
    const quesId = e.target.name;
    const quesIndex = +e.target.getAttribute('data-question-index');
    const correctAnsIndex = this.props.questions[quesIndex].correctAnsIndex;
    const userClickedIndex = +e.target.getAttribute('data-choice-index');

    const labels = document.querySelectorAll(`label[name='${quesId}']`);

    labels.forEach((e, i) => {
      // If i is equal to correctAnsIndex then add correctAns class
      if (i === correctAnsIndex) {
        return e.classList.add('correctAns', 'no-pointer-events');
      }

      // If i is equal to userClickedIndex then add incorrectAns class
      if (i === userClickedIndex) {
        return e.classList.add('incorrectAns', 'no-pointer-events');
      }

      return e.classList.add('no-pointer-events');
    });

    // Find the footer by quesID
    const footer = document.getElementById(quesId);
    // remove class hidden from the footer
    footer.classList.remove('hidden');
  }

  onNextBtnClick(e) {
    e.preventDefault();

    this.props.getQuestions(this.state.category, this.state.nextPage);
    const nextPage = this.state.nextPage;
    const updatedNextPage =
      +this.props.pages <= nextPage ? nextPage : nextPage + 1;
    this.setState({
      nextPage: updatedNextPage
    });
  }

  onBackBtnClick(e) {
    e.preventDefault();

    this.props.getQuestions(this.state.category, this.state.prevPage);
    const prevPage = this.state.prevPage;
    const updatedPrevPage = prevPage === 1 ? 1 : prevPage - 1;
    this.setState({
      prevPage: updatedPrevPage
    });
  }

  render() {
    return this.props.loading ? (
      <Spinner />
    ) : (
      <div className="container">
        <Questions
          currentQuiz={this.props.questions}
          handleInputChange={this.handleInputChange}
        />
        <div
          className="field is-grouped "
          style={{ display: 'flex', justifyContent: 'space-evenly' }}
        >
          <div className="control ">
            <button
              className="button is-danger is-medium"
              onClick={this.onBackBtnClick.bind(this)}
            >
              <span className="icon ">
                <i className="fas fa-arrow-left " />
              </span>
              <span>Back</span>
            </button>
          </div>

          <div className="control ">
            <button
              className="button is-success is-medium"
              onClick={this.onNextBtnClick.bind(this)}
              // disabled={this.props.pages  this.state.nextPage}
            >
              <span>Next</span>
              <span className="icon ">
                <i className="fas fa-arrow-right" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.question.questions,
  pages: state.question.pages,
  loading: state.question.loading
});

export default connect(mapStateToProps, { getQuestions })(QuestionsMain);
