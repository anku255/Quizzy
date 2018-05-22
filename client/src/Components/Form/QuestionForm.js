import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {
  renderTextAreaField,
  renderTextField,
  renderSelectField
} from './formFields';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'text',
    'choices',
    'correctAnsIndex',
    'semester',
    'category',
    'ansDescription'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  if (values['correctAnsIndex'] < 1 || values['correctAnsIndex'] > 4)
    errors['correctAnsIndex'] = 'Index must lie in the range [1-4]';

  return errors;
};

const semestersArray = [1, 2, 3, 4, 5, 6, 7, 8];
const categoriesArray = ['category1', 'category2', 'category3'];

const QuestionForm = props => {
  const { handleSubmit, onQuestionSubmit, pristine, reset } = props;
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
          Question Form
        </div>
        <form onSubmit={handleSubmit(() => onQuestionSubmit())}>
          <Field
            name="text"
            component={renderTextAreaField}
            label="Question Text"
            placeholder="Question Text"
            rows="1"
          />

          <Field
            name="choices"
            component={renderTextField}
            label="Options"
            type="text"
            placeholder="option-1, option-2..."
            helpText="Enter comma seperated options [Ex. option 1, option 2, option 3..]"
          />

          <div className="columns">
            <div className="column">
              <Field
                name="correctAnsIndex"
                type="number"
                label="Correct Answer Index"
                component={renderTextField}
                placeholder="Correct Answer Index"
                helpText="Index should be in the range [1: 4]"
              />
            </div>

            <div className="column">
              <Field
                name="semester"
                component={renderSelectField}
                label="Semester"
                valuesArray={semestersArray}
              />
            </div>

            <div className="column">
              <Field
                name="category"
                component={renderSelectField}
                label="Category"
                valuesArray={categoriesArray}
              />
            </div>
          </div>

          <Field
            name="ansDescription"
            component={renderTextAreaField}
            label="Answer Description"
            placeholder="Answer Description"
            rows="2"
          />

          <div
            className="field is-grouped "
            style={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <div className="control ">
              <button className="button is-danger is-medium ">
                <Link to="/" className="has-text-white">
                  <span className="icon ">
                    <i className="fas fa-ban " />
                  </span>
                  <span>Cancel</span>
                </Link>
              </button>
            </div>

            <div className="control ">
              <button
                className="button is-warning is-medium"
                disabled={pristine}
                onClick={() => reset()}
              >
                <span>Reset</span>
                <span className="icon ">
                  <i className="fas fa-sync " />
                </span>
              </button>
            </div>

            <div className="control ">
              <button
                className="button is-success is-medium"
                disabled={pristine}
              >
                <span>Next</span>
                <span className="icon ">
                  <i className="fas fa-arrow-right " />
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'questionForm', // a unique identifier for this form
  validate,
  destroyOnUnmount: false
})(QuestionForm);
