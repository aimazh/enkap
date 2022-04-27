import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import * as Components from './components';

const App = () => {
  return (
    <div className='app'>
      <Components.Header />
      <Components.Settings />
      <Components.List />
      <Components.Footer />
    </div>
  );
};

ReactDOM.render((
  <App />
), document.getElementById('root'));
