import React from 'react';
import './index.scss';

export const Header = () => {
  const handleRefresh = (e) => {
    e.preventDefault();
  };

  return (
    <div className='header'>
      <div className='title'>
        <i className='fas fa-grip' />
        <span>enkap</span>
      </div>
      <div className='subtitle'>simple password manager powered by Notion.</div>
      <div className='actions'>
        <a className='action' href='/' onClick={handleRefresh}>
          <i className='fas fa-redo-alt' />
          <span>refresh</span>
        </a>
      </div>
    </div>
  )
};
