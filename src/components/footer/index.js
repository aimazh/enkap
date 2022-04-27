import React from 'react';
import './index.scss';

export const Footer = () => {
  return (
    <div className='footer'>
      <div className='items'>
        <p className='item'>
          <i className='fas fa-code-branch' />
          <span>v0.1.1</span>
        </p>
        <div className='item fill' />
        <a className='item' href='https://aimazh.com' target='_blank' rel='noreferrer'>
          <i className='fas fa-code' />
          <span>@aimazh</span>
        </a>
        <a className='item' href='https://github.com/aimazh/enkap' target='_blank' rel='noreferrer'>
          <i className='fab fa-github' />
          <span>source</span>
        </a>
      </div>
    </div>
  )
};
