import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import './css/mystyles.css';
import './utils/fontawesome/js/fontawesome-all.min.js';
import './index.css';
import './utils/scripts';
import reducers from './reducers';
import App from './Components/App';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
const theme = createMuiTheme();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
