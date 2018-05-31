import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import './css/mystyles.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'katex/dist/katex.min.css';
import './utils/markdown-it-texmath/css/texmath.css';
import './utils/fontawesome/js/fontawesome-all.min.js';
import './index.css';
import './utils/scripts';
import reducers from './reducers';
import App from './Components/App';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
