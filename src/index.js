import './style/index.css';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App/App';
import { store } from './Redux/store/configureStore';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  container
);
