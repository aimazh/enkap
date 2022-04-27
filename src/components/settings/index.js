import React from 'react';
import './index.scss';

export const Settings = () => {
  const [shown, setShown] = React.useState(false);

  const handleShowHide = (e) => {
    e.preventDefault();
    setShown(!shown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='settings'>
      <a className='toggle' href='/' onClick={handleShowHide}>
        <i className={'fas fa-' + (shown ? 'minus' : 'plus')} />
        <span>{shown ? 'hide' : 'show'} settings</span>
      </a>
      <div className={'content' + (shown ? '' : ' hidden')}>
        <div className='form'>
          <div className='title'>
            <span>theme </span>
            <span className='details'>
              (credits to <a href='https://monkeytype.com' target='_blank' rel='noreferrer'>monkeytype</a>)
            </span>
          </div>
          <div className='inputs'>
            <div className='input select'>
              <i className='fas fa-palette fa-lg icon' />
              <select>
                <option>theme a</option>
                <option>theme b</option>
                <option>theme c</option>
              </select>
            </div>
          </div>
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <div className='title'>
            <span>notion integration </span>
            <span className='details'>
              (<a href='https://developers.notion.com/docs/getting-started' target='_blank' rel='noreferrer'>learn more</a>)
            </span>
          </div>
          <div className='inputs'>
            <div className='input text'>
              <i className='fas fa-key fa-lg icon' />
              <input placeholder='secret key' />
            </div>
            <div className='input text'>
              <i className='fas fa-database fa-lg icon' />
              <input placeholder='database id' />
            </div>
            <button type='input button'>
              <i className='fas fa-check' />
              <span>save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};
