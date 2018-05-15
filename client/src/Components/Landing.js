import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <h2>Welcome to Quizzy!!</h2>
          <Link to={'/current'}>Go to Current Quiz</Link>
        </div>
      </div>
    );
  }
}

export default Landing;
