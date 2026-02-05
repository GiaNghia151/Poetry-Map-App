// Polyfill for process - MUST BE FIRST
if (typeof window !== 'undefined') {
  window['process'] = window['process'] || { env: {} };
}

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

console.log('Index script starting...');

const renderApp = function () {
  var root = document.getElementById('root');
  if (root) {
    try {
      ReactDOM.render(
        <App />,
        root
      );
    } catch (e) {
      console.error('React render error:', e);
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}