import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import { submitQuestion } from '../../actions';
import { withRouter } from 'react-router-dom';

const QuestionFormReview = ({
  onCancel,
  formValues,
  submitQuestion,
  history
}) => {
  const handleSubmit = (e, formValues) => {
    e.preventDefault();

    const result = { ...formValues, choices: [] };
    for (let i = 0; i < 4; i++) {
      result.choices.push(formValues[`choice${i}`]);
      delete result[`choice${i}`];
    }

    submitQuestion(result, history);
  };

  const choices = ['choice0', 'choice1', 'choice2', 'choice3'];

  return (
    <div>
      <Paper elevation={4}>
        {/* Question Text (h4) */}
        <Typography variant="headline" component="h4">
          {formValues.text}
        </Typography>

        {/* Choices are wrapped inside FromControl Component */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Options:</FormLabel>

          {/* Radio buttons are grouped within a RadioGroup */}
          <RadioGroup value={choices[formValues.correctAnsIndex]}>
            {choices.map((choice, index) => {
              return (
                <FormControlLabel
                  key={choice}
                  control={<Radio />}
                  value={choice}
                  label={formValues[choice]}
                />
              );
            })}
          </RadioGroup>
        </FormControl>

        <div>
          <div>
            <strong>Semester: </strong> {formValues.semester}
          </div>
          <div>
            <strong>Category: </strong> {formValues.category}
          </div>
        </div>

        <Divider />

        <Typography variant="subheading" gutterBottom>
          {formValues.ansDescription}
        </Typography>
      </Paper>

      <Button variant="raised" color="secondary" onClick={onCancel}>
        Back
      </Button>
      <Button
        variant="raised"
        color="primary"
        onClick={e => handleSubmit(e, formValues)}
      >
        Submit Question
      </Button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.questionForm.values
  };
}

export default connect(mapStateToProps, { submitQuestion })(
  withRouter(QuestionFormReview)
);
