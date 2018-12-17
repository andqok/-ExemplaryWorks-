import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx'

const title = 'My Minimal mark (A)';

const wrapper = document.getElementById('app')

ReactDOM.render(
  <App title="title"/>,
  wrapper
);

