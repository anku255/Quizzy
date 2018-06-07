import React from 'react';

const QuizCardContent = ({ quiz }) => (
  <div className="card-content">
    <div>
      <strong>Start Time: </strong> {new Date(quiz.startTime).toLocaleString()}
    </div>
    <div>
      <strong>End Time: </strong> {new Date(quiz.endTime).toLocaleString()}
    </div>
    <div>
      <strong>Description: </strong> {quiz.description}
    </div>
  </div>
);

const QuizActions = () => (
  <footer
    className="card-footer"
    style={{ display: 'block', padding: '5px 0px' }}
  >
    <div className="content">
      <div className="centered-container">
        <button className="button is-primary is-outlined">Edit</button>
        <button className="button is-info is-outlined">Publish</button>
        <button className="button is-success is-outlined">
          Set Current Quiz
        </button>
      </div>
    </div>
  </footer>
);

const Quizzes = ({ quizzes }) => {
  return quizzes.map(quiz => {
    return (
      <div key={quiz._id} className="card" style={{ margin: '20px auto' }}>
        <QuizCardContent quiz={quiz} />
        <QuizActions />
      </div>
    );
  });
};

export default Quizzes;
