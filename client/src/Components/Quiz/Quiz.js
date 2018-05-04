import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel
} from 'material-ui/Form';

// CSS
const styles = {
  root: {
    margin: '0 2%',
    flexGrow: 1
  },
  gridContainer: {
    textAlign: 'center'
  },
  paper: {
    textAlign: 'left',
    padding: 16,
    marginTop: 5
  }
};

// prettier-ignore
class Quiz extends Component {
  render() {
    return (
      <div style={styles.root}>

        {/* Grid Container */}
        <Grid container style={styles.gridContainer}>
          <Grid item xs={12}>

           {/* One Grid Item consist of One Paper Component */}
            <Paper style={styles.paper} elevation={4}>

              {/* Question Text (h4) */}
              <Typography variant="headline" component="h4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
                quam eos, quibusdam minima consectetur quod.
              </Typography>

              {/* Choices are wrapped inside FromControl Component */}
              <FormControl component="fieldset">
                <FormLabel component="legend">Options:</FormLabel>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Choice 1" />
                </FormGroup>
              </FormControl>

            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Quiz;
