import React from 'react';
import { useSelector } from 'react-redux';
import './index.scss';

export const List = () => {
  const data = useSelector(state => state.app.data);
  const loading = useSelector(state => state.app.loading);

  const [filter, setFilter] = React.useState('');


  const handleChangeFilter = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  };

  const handleCopy = (item) => (e) => {
    e.preventDefault();

    navigator.clipboard.writeText(item.secret);

    const span = document.getElementById(`copy-${item.id}`);
    if (span) {
      span.innerHTML = 'Copied';
      setTimeout(() => {
        span.innerHTML = 'Copy';
      }, 1000);
    }
  };

  const handleFilter = (item) => {
    return item.service.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1;
  }

  const filteredData = data.filter(handleFilter);

  return (
    <div className='list'>
      <div className='filter'>
        <div className='form'>
          <div className='inputs'>
            <div className='input text'>
              <i className='fas fa-search fa-lg icon' />
              <input placeholder='filter by service' onChange={handleChangeFilter} autoFocus />
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className='loading'>
          <i className='fas fa-fan fa-xl spinner' />
          <span>loading</span>
        </div>
      )}
      {filteredData.length === 0 && (
        <div className='empty'>
          <i className='fas fa-martini-glass-empty fa-xl' />
          <span>no entries with current filter</span>
        </div>
      )}
      {filteredData.length > 0 && (
        <div className='items'>
          {filteredData.map(item => (
            <div className='item' key={item.id}>
              <div className='title'>{item.service}</div>
              <div className='properties'>
                <a className='property copy' href='/' onClick={handleCopy(item)}>
                  <i className='fas fa-key' />
                  <span id={`copy-${item.id}`}>Copy</span>
                </a>
                <div className='property email'>
                  <i className='fas fa-at' />
                  <span>{item.email || '-'}</span>
                </div>
                <div className='property username'>
                  <i className='fas fa-user' />
                  <span>{item.username || '-'}</span>
                </div>
              </div>
              {item.notes && (
                <div className='notes'>{item.notes}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
};
