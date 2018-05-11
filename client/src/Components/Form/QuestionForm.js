import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { renderTextField, renderSelectField } from './formFields';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'text',
    'choice0',
    'choice1',
    'choice2',
    'choice3',
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

  if (values['correctAnsIndex'] < 0 || values['correctAnsIndex'] > 3)
    errors['correctAnsIndex'] = 'Index must lie in the range [0-3]';

  return errors;
};

const semestersArray = [1, 2, 3, 4, 5, 6, 7, 8];
const categoriesArray = ['category1', 'category2', 'category3'];
const choicesArray = [
  { name: 'choice0', label: 'Option 1' },
  { name: 'choice1', label: 'Option 2' },
  { name: 'choice2', label: 'Option 3' },
  { name: 'choice3', label: 'Option 4' }
];

const QuestionForm = props => {
  const { handleSubmit, onQuestionSubmit, pristine } = props;
  return (
    <div>
      <Typography variant="title" gutterBottom>
        Submit A New Question
      </Typography>
      <form onSubmit={handleSubmit(() => onQuestionSubmit())}>
        <div>
          <Field
            name="text"
            component={renderTextField}
            label="Question Text"
            multiline
            fullWidth
          />
        </div>
        <div>
          {choicesArray.map(({ name, label }) => {
            return (
              <Field
                key={name}
                name={name}
                component={renderTextField}
                label={label}
              />
            );
          })}
        </div>
        <div>
          <Field
            name="correctAnsIndex"
            component={renderTextField}
            label="Correct Answer Index"
            type="number"
          />
        </div>
        <div>
          <Field
            name="semester"
            component={renderSelectField}
            label="Semester"
            valuesArray={semestersArray}
          />
        </div>
        <div>
          <Field
            name="category"
            component={renderSelectField}
            label="Category"
            valuesArray={categoriesArray}
          />
        </div>
        <div>
          <Field
            name="ansDescription"
            component={renderTextField}
            label="Answer Description"
            multiline
            fullWidth
          />
        </div>
        <div>
          <Button variant="raised" color="secondary">
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Back
            </Link>
          </Button>
          <Button
            variant="raised"
            color="primary"
            disabled={pristine}
            type="submit"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'questionForm', // a unique identifier for this form
  validate,
  destroyOnUnmount: false
})(QuestionForm);
