// This is used inside QuestionsMain Component
// It receives a questions array prop and
// it renders all the questions present in that array

// The CSS classes used in this component are defined in
// mystyles.css file

import React from 'react';

const renderChoices = (Question, quesIndex, handleInputChange) => {
  return Question.choices.map((choice, index) => {
    return (
      <label
        key={choice}
        className="radio-btn-label"
        onChange={handleInputChange}
        name={`${Question._id}`}
      >
        <input
          type="radio"
          className="radio-btn"
          name={Question._id}
          value={choice}
          data-question-index={quesIndex}
          data-choice-index={index}
        />
        {choice}
      </label>
    );
  });
};

export default ({ currentQuiz, handleInputChange, response }) => {
  return currentQuiz.map((Question, index) => {
    return (
      <div key={Question._id} className="card" style={{ margin: '20px auto' }}>
        <header className="card-header">
          <p
            className="is-size-4"
            style={{ textAlign: 'left', padding: '5px 20px' }}
          >
            {Question.text}
          </p>
        </header>
        <div className="card-content">
          <div className="control radio-container">
            {renderChoices(Question, index, handleInputChange)}
          </div>
        </div>
        <footer id={Question._id} className="card-footer hidden">
          <div className="content ans-description">
            <div className="subtitle">Answer description</div>
            {Question.ansDescription}
          </div>
        </footer>
      </div>
    );
  });
};
