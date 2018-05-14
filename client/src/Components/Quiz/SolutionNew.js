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
  },
  correctAns: {
    margin: 0,
    fontWeight: 600,
    color: 'green',
    fontSize: '1.25rem'
  },
  incorrectAns: {
    margin: 0,
    fontWeight: 600,
    color: 'red',
    fontSize: '1.25rem'
  },
  ansDescription: {
    textAlign: 'left',
    padding: '5px 20px'
  }
};

/**
 * @param correctAnsIndex - Index of the correct choice
 * @param responeIndex - Index of the choice selected by the user
 * @param choiceIndex - Index of the choice for which the fn is called
 * @returns proper CSS class
 */
function getCSSClass(correctAnsIndex, responseIndex, choiceIndex) {
  if (choiceIndex === correctAnsIndex) {
    return classes.correctAns;
  }

  if (responseIndex === choiceIndex) {
    return classes.incorrectAns;
  }

  return classes.radioBtn;
}

const renderChoices = (Question, response) => {
  return Question.choices.map((choice, index) => {
    // get the proper CSS class for the label
    const cssClass = getCSSClass(
      Question.correctAnsIndex,
      +response[Question._id],
      index
    );
    return (
      <label key={choice} className="radio" style={cssClass}>
        <input
          type="radio"
          name={Question._id}
          value={choice}
          checked={+response[Question._id] === index}
          readOnly
        />
        {choice}
      </label>
    );
  });
};

export default ({ currentQuiz, response }) => {
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
            {renderChoices(Question, response)}
          </div>
        </div>
        <footer className="card-footer">
          <div className="content" style={classes.ansDescription}>
            <div className="subtitle">Answer Description</div>
            {Question.ansDescription}
          </div>
        </footer>
      </div>
    );
  });
};
