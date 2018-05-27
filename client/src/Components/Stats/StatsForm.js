import React from 'react';
import { renderTextField, renderSelectField } from '../Form/formFields';
import { categoriesArray } from '../common/selectValues';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};

  if (!values['category']) {
    errors['category'] = 'Required';
  }

  if (values['correctCount'] < 0)
    errors['correctCount'] = 'Correct Count must be positive.';

  if (values['incorrectCount'] < 0)
    errors['incorrectCount'] = 'Incorrect Count must be positive.';

  return errors;
};

const StatsForm = ({ handleSubmit, onSubmit, pristine }) => {
  return (
    // handleSubmit is provided by reduxForm. handleSubmit is called with
    // all the values from the form
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="columns">
        <div className="column">
          <Field
            name="category"
            component={renderSelectField}
            label="Category"
            valuesArray={categoriesArray}
          />
        </div>

        <div className="column">
          <Field
            name="correctCount"
            type="number"
            label="Correct Count"
            component={renderTextField}
            placeholder="Correct Count"
          />
        </div>
        <div className="column">
          <Field
            name="incorrectCount"
            type="number"
            label="Incorrect Count"
            component={renderTextField}
            placeholder="Incorrect Count"
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="button is-primary" type="submit" disabled={pristine}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'statsForm', // a unique identifier for this form
  validate
})(StatsForm);
