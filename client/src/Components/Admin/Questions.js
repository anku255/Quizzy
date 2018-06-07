import React from 'react';
import {
  QuestionTitle,
  Choices,
  AnswerDescription
} from '../common/QuestionCard';

export default ({ Questions, onSelectQuestion }) => {
  return Questions.map((Question, index) => {
    return (
      <div
        id={Question._id}
        key={Question._id}
        onClick={e => onSelectQuestion(e, Question._id)}
        className="card"
        style={{ margin: '20px auto' }}
      >
        <QuestionTitle title={Question.text} />
        <div className="card-content">
          <Choices
            Question={Question}
            index={index}
            handleInputChange={() => {}}
          />
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
