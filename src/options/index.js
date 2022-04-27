import React from 'react';
import ReactDOM from 'react-dom';

const Options = () => (
  <div>
    <h1>Enkap</h1>
    <h2>Playground</h2>
    <label>Password: </label>
    <input type='password' />
  </div>
);

ReactDOM.render(<Options />, document.getElementById('options'));
