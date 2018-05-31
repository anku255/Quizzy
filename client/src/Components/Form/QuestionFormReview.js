import React from 'react';
import { connect } from 'react-redux';
import { addQuestion } from '../../actions';
import { withRouter } from 'react-router-dom';
import { QuestionTitle, AnswerDescription } from '../common/QuestionCard';
import createMarkup from '../../utils/createMarkup';

const classes = {
  radioContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  radioBtn: {
    marginRight: '10px'
  },
  radioBtnLabel: {
    margin: '2px',
    fontSize: '1.2rem',
    fontWeight: 500
  },
  ansDescription: {
    padding: '5px 20px'
  }
};

const QuestionFormReview = ({ onCancel, formValues, addQuestion }) => {
  const handleSubmit = (e, formValues) => {
    e.preventDefault();

    const result = { ...formValues };
    result.choices = result.choices.split(', ');

    // Substract 1 from correctAnsIndex
    result.correctAnsIndex -= 1;
    addQuestion(result, onCancel);
  };

  return (
    <div className="container">
      <div
        style={{
          margin: '20px 50px',
          padding: '20px',
          border: '2px solid rgb(177, 173, 173)'
        }}
      >
        <div className="title" style={{ textAlign: 'center' }}>
          Please Confirm Your Entries!
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <span className="tag is-rounded is-info">
            Category: {formValues.category}
          </span>
          <span className="tag is-rounded is-info">
            Semester: {formValues.semester}
          </span>
        </div>
        <div className="card" style={{ margin: '20px auto' }}>
          <QuestionTitle title={formValues.text} />
          <div className="card-content">
            <div className="control" style={classes.radioContainer}>
              {formValues.choices.split(', ').map((choice, index) => (
                <label
                  key={choice}
                  className="radio"
                  style={classes.radioBtnLabel}
                >
                  <input
                    type="radio"
                    checked={+formValues.correctAnsIndex === index + 1}
                    style={classes.radioBtn}
                    readOnly
                  />
                  <span
                    className="choice"
                    dangerouslySetInnerHTML={createMarkup(choice)}
                  />
                </label>
              ))}
            </div>
          </div>
          <AnswerDescription
            description={formValues.ansDescription}
            hidden={false}
          />
        </div>
        <div
          className="field is-grouped "
          style={{ display: 'flex', justifyContent: 'space-evenly' }}
        >
          <div className="control ">
            <button className="button is-danger is-medium" onClick={onCancel}>
              <span className="icon ">
                <i className="fas fa-arrow-left " />
              </span>
              <span>Back</span>
            </button>
          </div>

          <div className="control ">
            <button
              className="button is-success is-medium"
              onClick={e => handleSubmit(e, formValues)}
            >
              <span>Submit</span>
              <span className="icon ">
                <i className="fas fa-check " />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.questionForm.values
  };
}

export default connect(mapStateToProps, { addQuestion })(
  withRouter(QuestionFormReview)
);
