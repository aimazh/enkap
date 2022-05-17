import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';

import { store } from './redux';
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
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
