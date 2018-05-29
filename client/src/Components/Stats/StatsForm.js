import React from 'react';
import { renderSelectField } from '../Form/formFields';
import { categoriesArray } from '../common/selectValues';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};

  if (!values['category']) {
    errors['category'] = 'Required';
  }

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
            name="sortBy"
            component={renderSelectField}
            label="Sort By"
            valuesArray={['correctCount', 'incorrectCount']}
            helpText="Defaults to incorrectCount"
          />
        </div>
        <div className="column">
          <Field
            name="order"
            component={renderSelectField}
            label="Order"
            valuesArray={['ascending', 'descending']}
            helpText="Defaults to descending"
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
