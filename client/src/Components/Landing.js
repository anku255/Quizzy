import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';

// CSS
const styles = {
  root: {
    flexGrow: 1
  },
  center: {
    textAlign: 'center'
  }
};

class Landing extends Component {
  render() {
    return (
      <div style={styles.root}>
        <Grid container>
          <Grid item xs={12} style={styles.center}>
            <h2>Welcome to Quizzy!!</h2>
            <Link to={'/current'}>Go to Current Quiz</Link>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Landing;
