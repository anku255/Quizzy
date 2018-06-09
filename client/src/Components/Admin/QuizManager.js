import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getQuizzes,
  addQuiz,
  clearNotifications,
  publishQuiz,
  setCurrentQuiz
} from '../../actions';
import { ToastContainer, toast } from 'react-toastify';
import Quizzes from './Quizzes';
import Spinner from '../common/Spinner';
import QuizFormModal from './QuizFormModal';

class QuizManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      editQuiz: null
    };

    this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
    this.handleQuizFormSubmit = this.handleQuizFormSubmit.bind(this);
    this.handlePublishBtnClick = this.handlePublishBtnClick.bind(this);
    this.handleSetCurrentQuizBtnClick = this.handleSetCurrentQuizBtnClick.bind(
      this
    );
  }

  componentDidMount() {
    this.props.getQuizzes();
  }

  componentWillReceiveProps(nextProps) {
    // Map loading prop to state
    this.setState({ loading: nextProps.loading });

    if (Object.keys(nextProps.errors).length > 0) {
      toast.error(JSON.stringify(nextProps.errors));
      return this.props.clearNotifications();
    }

    if (Object.keys(nextProps.success).length > 0) {
      toast.success(JSON.stringify(nextProps.success));
      // console.log the new quiz
      console.log(nextProps.success.newQuiz);
      return this.props.clearNotifications();
    }
  }

  toggleModal() {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('is-active');
  }

  handleQuizFormSubmit(e, values) {
    e.preventDefault();

    const quizData = { ...values, _id: this.state.editQuiz._id };
    this.props.addQuiz(quizData);
    this.toggleModal();
  }

  handleEditBtnClick(e, editQuiz) {
    e.preventDefault();

    this.setState({ editQuiz });
    this.toggleModal();
  }

  handlePublishBtnClick(e, quiz) {
    e.preventDefault();
    this.props.publishQuiz(quiz);
  }

  handleSetCurrentQuizBtnClick(e, quiz) {
    e.preventDefault();
    this.props.setCurrentQuiz(quiz);
  }

  render() {
    return (
      <div className="container" style={{ margin: '20px auto' }}>
        <h2 className="is-size-2" style={{ textAlign: 'center' }}>
          Quizzes
        </h2>
        <QuizFormModal
          toggleModal={this.toggleModal}
          handleSubmit={this.handleQuizFormSubmit}
          quiz={this.state.editQuiz}
        />
        {this.state.loading ? (
          <Spinner />
        ) : (
          <Quizzes
            quizzes={this.props.quizzes}
            onEditBtnClick={this.handleEditBtnClick}
            onPublishBtnClick={this.handlePublishBtnClick}
            onSetCurrentQuizBtnClick={this.handleSetCurrentQuizBtnClick}
          />
        )}
        <ToastContainer position="top-center" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quizzes: state.admin.quizzes,
  loading: state.admin.loading,
  errors: state.notification.errors,
  success: state.notification.success
});

export default connect(
  mapStateToProps,
  { getQuizzes, addQuiz, clearNotifications, publishQuiz, setCurrentQuiz }
)(QuizManager);
