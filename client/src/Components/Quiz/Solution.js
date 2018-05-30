import React from 'react';
import {
  QuestionTitle,
  ChoicesSolution,
  AnswerDescription
} from '../common/QuestionCard';

export default ({ currentQuiz, response }) => {
  return currentQuiz.map((Question, index) => {
    return (
      <div key={Question._id} className="card" style={{ margin: '20px auto' }}>
        <QuestionTitle title={Question.text} />
        <div className="card-content">
          <ChoicesSolution Question={Question} response={response} />
        </div>
        <AnswerDescription
          id={Question._id}
          description={Question.ansDescription}
          hidden={false}
        />
      </div>
    );
  });
};
