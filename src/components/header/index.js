import React from 'react';
import { useStore } from 'react-redux';
import { loadData } from '../../redux';
import './index.scss';

export const Header = () => {
  const store = useStore();

  const handleRefresh = (e) => {
    e.preventDefault();
    store.dispatch(loadData());
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
