import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderTextField, renderSelectField } from '../Form/formFields';
import { categoriesArray } from '../common/selectValues';
import { Field, reduxForm } from 'redux-form';
import { getQuizStats } from '../../actions';

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

class StatsMain extends Component {
  onSubmit(values) {
    // This query object will be sent to the server
    const query = {
      params: {}
    };
    const { correctCount } = values;
    const { incorrectCount } = values;
    if (correctCount) query.params.correctCount = correctCount;
    if (incorrectCount) query.params.incorrectCount = incorrectCount;
    query.params.category = values.category;

    this.props.getQuizStats(query);
  }

  render() {
    return (
      <div className="container" style={{ margin: '20px auto' }}>
        <div className="card" style={{ width: '100%', margin: '20px 0' }}>
          <header className="card-header">
            <p className="is-size-4" style={{ margin: '0 auto' }}>
              Quiz Stats
            </p>
          </header>
          <div className="card-content">
            {/* handleSubmit is provided by reduxForm. handleSubmit is called with
          all the values from the form */}
            <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
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
                <button className="button is-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.quizStats
});

export default connect(mapStateToProps, { getQuizStats })(
  reduxForm({
    form: 'statsForm', // a unique identifier for this form
    validate
  })(StatsMain)
);
