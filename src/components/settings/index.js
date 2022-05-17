import React from 'react';
import { useSelector, useStore } from 'react-redux';
import { toggleSettings, changeTheme, updateAPIValues } from '../../redux';
import './index.scss';

export const Settings = () => {
  const store = useStore();
  const currentTheme = useSelector(state => state.app.currentTheme);
  const themes = useSelector(state => state.app.themes);
  const counter = useSelector(state => state.app.counter);
  const settingsOpen = useSelector(state => state.app.settingsOpen);
  const _key = useSelector(state => state.app.api.key);
  const _db = useSelector(state => state.app.api.db);

  const [key, setKey] = React.useState(_key || '');
  const [db, setDB] = React.useState(_db || '');

  const handleShowHide = (e) => {
    e.preventDefault();
    store.dispatch(toggleSettings());
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    store.dispatch(updateAPIValues(key, db));
  };

  const handleThemeChange = (e) => {
    store.dispatch(changeTheme(e.target.value));
  };

  return (
    <div className='settings'>
      <a className='toggle' href='/' onClick={handleShowHide}>
        <i className={'fas fa-' + (settingsOpen ? 'minus' : 'plus')} />
        <span>{settingsOpen ? 'hide' : 'show'} settings ({counter})</span>
      </a>
      <div className={'content' + (settingsOpen ? '' : ' hidden')}>
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
              <select value={currentTheme} onChange={handleThemeChange}>
                {themes.map(theme => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
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
              <input value={key} onChange={e => setKey(e.target.value)} placeholder='secret key' />
            </div>
            <div className='input text'>
              <i className='fas fa-database fa-lg icon' />
              <input value={db} onChange={e => setDB(e.target.value)} placeholder='database id' />
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
