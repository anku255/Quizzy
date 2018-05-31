import React from 'react';
import createMarkup from '../../utils/createMarkup';

export const QuestionTitle = ({ title }) => {
  return (
    <header className="card-header">
      <p
        className="is-size-4"
        style={{ textAlign: 'left', padding: '5px 20px' }}
        dangerouslySetInnerHTML={createMarkup(title)}
      />
    </header>
  );
};

export const Choices = ({ Question, quesIndex, handleInputChange }) => {
  return (
    <div className="control radio-container">
      {Question.choices.map((choice, index) => {
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
              data-question-id={Question._id}
              data-question-index={quesIndex}
              data-choice-index={index}
            />
            <span
              className="choice"
              dangerouslySetInnerHTML={createMarkup(choice)}
            />
          </label>
        );
      })}
    </div>
  );
};

export const ChoicesSolution = ({ Question, response }) => {
  return (
    <div className="control radio-container">
      {Question.choices.map((choice, index) => {
        // get the proper CSS classname for the label
        const CSSClass = getCSSClass(
          Question.correctAnsIndex,
          +response[Question._id],
          index
        );
        return (
          <label key={choice} className={CSSClass}>
            <input
              type="radio"
              className="radio-btn"
              name={Question._id}
              value={choice}
              checked={+response[Question._id] === index}
              readOnly
            />
            <span
              className="choice"
              dangerouslySetInnerHTML={createMarkup(choice)}
            />
          </label>
        );
      })}
    </div>
  );
};

export const AnswerDescription = ({ id, description, hidden }) => {
  const classNames = hidden ? 'card-footer hidden' : 'card-footer';
  return (
    <footer id={id} className={classNames}>
      <div className="content ans-description">
        <div className="subtitle" style={{ marginBottom: 0 }}>
          Answer description
        </div>
        <div dangerouslySetInnerHTML={createMarkup(description)} />
      </div>
    </footer>
  );
};

export const Count = ({ correct, incorrect }) => {
  return (
    <div className="centered-container">
      <span className="tag is-rounded is-success">{correct}</span>
      <span className="tag is-rounded is-danger">{incorrect}</span>
    </div>
  );
};

/**
 * @param correctAnsIndex - Index of the correct choice
 * @param responeIndex - Index of the choice selected by the user
 * @param choiceIndex - Index of the choice for which the fn is called
 * @returns proper CSS class name
 */
const getCSSClass = (correctAnsIndex, responseIndex, choiceIndex) => {
  if (choiceIndex === correctAnsIndex) {
    return 'correctAns';
  }

  if (responseIndex === choiceIndex) {
    return 'incorrectAns';
  }

  return 'radio-btn-label';
};
