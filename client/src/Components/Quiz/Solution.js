import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Divider from 'material-ui/Divider';

// CSS
const styles = {
  paper: {
    textAlign: 'left',
    padding: 16,
    marginTop: 5
  },
  defaultAns: {
    fontWeight: 500
  },
  correctAns: {
    color: 'green',
    fontWeight: 500,
    fontSize: '1em'
  },
  incorrectAns: {
    color: 'red',
    fontWeight: 500,
    fontSize: '0.9em'
  }
};

/**
 * @param correctAnsIndex - Index of the correct choice
 * @param responeIndex - Index of the choice selected by the user
 * @param choiceIndex - Index of the choice for which the fn is called
 * @returns
 */
function getClassName(correctAnsIndex, responseIndex, choiceIndex) {
  if (choiceIndex === correctAnsIndex) {
    return 'correctAns';
  }

  if (responseIndex === choiceIndex) {
    return 'incorrectAns';
  }

  return 'defaultAns';
}

const Solution = props => {
  return props.currentQuiz.map((Quiz, quesIndex) => {
    return (
      <Grid key={Quiz._id} item xs={12}>
        {/* One Grid Item consist of One Paper Component */}
        <Paper className={props.classes.paper} elevation={4}>
          {/* Question Text (h4) */}
          <Typography variant="headline" component="h4">
            {Quiz.text}
          </Typography>

          {/* Choices are wrapped inside FromControl Component */}
          <FormControl component="fieldset">
            <FormLabel component="legend">Options:</FormLabel>

            {/* Radio buttons are grouped within a RadioGroup */}
            <RadioGroup value={props.radioBtnValue[quesIndex]}>
              {Quiz.choices.map((choice, index) => {
                const classKey = getClassName(
                  Quiz.correctAnsIndex,
                  +props.response[Quiz._id],
                  index
                );

                return (
                  <FormControlLabel
                    key={choice}
                    classes={{ label: props.classes[classKey] }}
                    value={`${Quiz._id} ${index} ${quesIndex}`}
                    control={<Radio />}
                    label={choice}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
          <Divider />
          <Typography variant="subheading" gutterBottom>
            {Quiz.ansDescription}
          </Typography>
        </Paper>
      </Grid>
    );
  });
};

export default withStyles(styles)(Solution);
