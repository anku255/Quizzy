import React from 'react';
import {
  QuestionTitle,
  Choices,
  Count,
  AnswerDescription
} from '../common/QuestionCard';

// Each object in Questions array is of type
// {questionId, correctCount, incorrectCount}
// questionId field has the question
export default ({ Questions, handleInputChange }) => {
  return Questions.map((Obj, index) => {
    let Question = Obj.questionId;
    return (
      <div key={Question._id} className="card" style={{ margin: '20px auto' }}>
        <QuestionTitle title={Question.text} />
        <div className="card-content">
          <Choices
            Question={Question}
            index={index}
            handleInputChange={handleInputChange}
          />
          <Count correct={Obj.correctCount} incorrect={Obj.incorrectCount} />
        </div>
        <AnswerDescription
          id={Question._id}
          description={Question.ansDescription}
          hidden={true}
        />
      </div>
    );
  });
};
