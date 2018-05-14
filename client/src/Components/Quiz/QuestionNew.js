import React from 'react';
const classes = {
  radioContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  radioBtn: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 500
  }
};

const renderChoices = (Question, quesIndex, handleInputChange) => {
  return Question.choices.map((choice, index) => {
    return (
      <label
        key={choice}
        className="radio"
        style={classes.radioBtn}
        onChange={handleInputChange}
      >
        <input
          type="radio"
          name={Question._id}
          value={choice}
          data-question-id={Question._id}
          data-choice-index={index}
        />
        {choice}
      </label>
    );
  });
};

export default ({ currentQuiz, handleInputChange }) => {
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
          <div className="control" style={classes.radioContainer}>
            {renderChoices(Question, index, handleInputChange)}
          </div>
        </div>
      </div>
    );
  });
};
