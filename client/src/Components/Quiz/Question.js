import React from 'react';
import { QuestionTitle, Choices } from '../common/QuestionCard';

export default ({ currentQuiz, handleInputChange }) => {
  return currentQuiz.map((Question, index) => {
    return (
      <div key={Question._id} className="card" style={{ margin: '20px auto' }}>
        <QuestionTitle title={Question.text} />
        <div className="card-content">
          <Choices
            Question={Question}
            index={index}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
    );
  });
};
