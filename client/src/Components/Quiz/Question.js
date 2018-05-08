import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';

// CSS
const styles = {
  paper: {
    textAlign: 'left',
    padding: 16,
    marginTop: 5
  },
  submitBtn: {
    color: 'white'
  }
};

export default props => {
  return props.currentQuiz.map((Quiz, quesIndex) => {
    return (
      <Grid key={Quiz._id} item xs={12}>
        {/* One Grid Item consist of One Paper Component */}
        <Paper style={styles.paper} elevation={4}>
          {/* Question Text (h4) */}
          <Typography variant="headline" component="h4">
            {Quiz.text}
          </Typography>

          {/* Choices are wrapped inside FromControl Component */}
          <FormControl component="fieldset">
            <FormLabel component="legend">Options:</FormLabel>

            {/* Radio buttons are grouped within a RadioGroup */}
            <RadioGroup
              onChange={props.handleChange}
              value={props.radioBtnValue[quesIndex]}
            >
              {Quiz.choices.map((choice, index) => {
                return (
                  <FormControlLabel
                    key={choice}
                    value={`${Quiz._id} ${index} ${quesIndex}`}
                    control={<Radio />}
                    label={choice}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </Paper>
      </Grid>
    );
  });
};
