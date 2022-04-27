import React from 'react';
import ReactDOM from 'react-dom';
import { Client } from '@notionhq/client';
import './index.css';

const themes = {
  bento: {
    '--bg-color': '#2d394d',
    '--main-color': '#ff7a90',
    '--caret-color': '#ff7a90',
    '--sub-color': '#4a768d',
    '--sub-alt-color': '#263041',
    '--text-color': '#fffaf8',
    '--error-color': '#ee2a3a',
    '--error-extra-color': '#f04040',
    '--colorful-error-color': '#fc2032',
    '--colorful-error-extra-color': '#f04040',
  },
  wild: {
    '--bg-color': '#262a33',
    '--main-color': '#43ffaf',
    '--caret-color': '#43ffaf',
    '--sub-color': '#526777',
    '--sub-alt-color': '#1f232c',
    '--text-color': '#e5f7ef',
    '--error-color': '#ff5f5f',
    '--error-extra-color': '#d22a2a',
    '--colorful-error-color': '#ff5f5f',
    '--colorful-error-extra-color': '#d22a2a',
  },
  berry: {
    '--bg-color': '#2d394d',
    '--main-color': '#ff7a90',
    '--caret-color': '#ff7a90',
    '--sub-color': '#4a768d',
    '--sub-alt-color': '#263041',
    '--text-color': '#fffaf8',
    '--error-color': '#ee2a3a',
    '--error-extra-color': '#f04040',
    '--colorful-error-color': '#fc2032',
    '--colorful-error-extra-color': '#f04040',
  },
  gruvbox: {
    '--bg-color': '#fbf1c7',
    '--main-color': '#689d6a',
    '--caret-color': '#689d6a',
    '--sub-color': '#a89984',
    '--sub-alt-color': '#daceae',
    '--text-color': '#3c3836',
    '--error-color': '#cc241d',
    '--error-extra-color': '#9d0006',
    '--colorful-error-color': '#cc241d',
    '--colorful-error-extra-color': '#9d0006',
  },
  honey: {
    '--bg-color': '#f2aa00',
    '--main-color': '#fff546',
    '--caret-color': '#795200',
    '--sub-color': '#a66b00',
    '--sub-alt-color': '#e19e00',
    '--text-color': '#f3eecb',
    '--error-color': '#df3333',
    '--error-extra-color': '#6d1f1f',
    '--colorful-error-color': '#df3333',
    '--colorful-error-extra-color': '#6d1f1f',
  },
  muted: {
    '--bg-color': '#525252',
    '--main-color': '#c5b4e3',
    '--caret-color': '#b1e4e3',
    '--sub-color': '#939eae',
    '--sub-alt-color': '#494949',
    '--text-color': '#b1e4e3',
    '--error-color': '#edc1cd',
    '--error-extra-color': '#edc1cd',
    '--colorful-error-color': '#edc1cd',
    '--colorful-error-extra-color': '#edc1cd',
  },
  paper: {
    '--bg-color': '#eee',
    '--main-color': '#444',
    '--caret-color': '#444',
    '--sub-color': '#b2b2b2',
    '--sub-alt-color': '#ddd',
    '--text-color': '#444',
    '--error-color': '#d70000',
    '--error-extra-color': '#d70000',
    '--colorful-error-color': '#d70000',
    '--colorful-error-extra-color': '#d70000',
  },
  rose: {
    '--bg-color': '#fffaf3',
    '--main-color': '#56949f',
    '--caret-color': '#ea9d34',
    '--sub-color': '#c4a7e7',
    '--sub-alt-color': '#f0e9df',
    '--text-color': '#286983',
    '--error-color': '#b4637a',
    '--error-extra-color': '#d7827e',
    '--colorful-error-color': '#b4637a',
    '--colorful-error-extra-color': '#d7827e',
  },
  shoko: {
    '--bg-color': '#ced7e0',
    '--main-color': '#81c4dd',
    '--caret-color': '#81c4dd',
    '--sub-color': '#7599b1',
    '--sub-alt-color': '#b7cada',
    '--text-color': '#3b4c58',
    '--error-color': '#bf616a',
    '--error-extra-color': '#793e44',
    '--colorful-error-color': '#bf616a',
    '--colorful-error-extra-color': '#793e44',
  },
  sweden: {
    '--bg-color': '#0058a3',
    '--main-color': '#ffcc02',
    '--caret-color': '#b5b5b5',
    '--sub-color': '#57abdb',
    '--sub-alt-color': '#024f8e',
    '--text-color': '#fff',
    '--error-color': '#e74040',
    '--error-extra-color': '#a22f2f',
    '--colorful-error-color': '#f56674',
    '--colorful-error-extra-color': '#e33546',
  },
  vscode: {
    '--bg-color': '#1e1e1e',
    '--main-color': '#007acc',
    '--caret-color': '#569cd6',
    '--sub-color': '#4d4d4d',
    '--sub-alt-color': '#191919',
    '--text-color': '#d4d4d4',
    '--error-color': '#f44747',
    '--error-extra-color': '#f44747',
    '--colorful-error-color': '#f44747',
    '--colorful-error-extra-color': '#f44747',
  },
};

const readPropertyValue = (property) => {
  if (property['title'] && property['title'].length > 0) {
    return property['title'][0]['text']['content']
  }
  if (property['rich_text'] && property['rich_text'].length > 0) {
    return property['rich_text'][0]['text']['content']
  }
  return undefined;
};

const App = () => {
  const [theme, setTheme] = React.useState(localStorage.getItem('THEME') || 'bento');
  const [notionKey, setNotionKey] = React.useState(localStorage.getItem('NOTION_KEY'));
  const [notionDB, setNotionDB] = React.useState(localStorage.getItem('NOTION_DB'));

  const [data, setData] = React.useState(JSON.parse(localStorage.getItem('NOTION_DATA')) || []);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [formKey, setFormKey] = React.useState('');
  const [formDB, setFormDB] = React.useState('');

  const loadTheme = (name = 'bento') => {
    const colors = themes[name];
    if (!colors) {
      setTheme('bento');
      return;
    }
    Object.keys(colors).forEach(key => {
      document.documentElement.style.setProperty(key, colors[key]);
    });
  };

  const load = async () => {
    if (!notionKey || !notionDB) {
      return;
    }

    const notion = new Client({ auth: notionKey });

    setError('');
    setLoading(true);

    try {
      const response = await notion.databases.query({
        database_id: notionDB,
        sorts: [
          { property: "Service", direction: "ascending" },
        ],
      });

      let data = [];

      if (response && response.results) {
        data = response.results.map(item => ({
          id: item.id,
          service: readPropertyValue(item.properties['Service']),
          username: readPropertyValue(item.properties['Username']),
          email: readPropertyValue(item.properties['Email']),
          secret: readPropertyValue(item.properties['Secret']),
          notes: readPropertyValue(item.properties['Notes']),
        }));
      }

      setData(data);
      setLoading(false);

      localStorage.setItem('NOTION_DATA', JSON.stringify(data));
    } catch (error) {
      setError(error);
      setNotionKey(undefined);
      setNotionDB(undefined);
    }
  };

  React.useEffect(() => {
    localStorage.setItem('THEME', theme);
    loadTheme(theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formKey || !formDB) {
      return;
    }

    setNotionKey(formKey);
    setNotionDB(formDB);

    localStorage.setItem('NOTION_KEY', formKey);
    localStorage.setItem('NOTION_DB', formDB);

    setFormKey('');
    setFormDB('');

    setTimeout(() => {
      load();
    }, 500);
  };

  const handleRefresh = (e) => {
    e.preventDefault();
    load();
  };

  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
  };

  const handleFilter = (item) => {
    return item.service.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) > -1;
  }

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

  const filteredData = data.filter(handleFilter);

  if (!notionKey || !notionDB) {
    return (
      <div className='app'>
        <div className='header'>
          <div className='title'>
            <i className='fas fa-grip' />
            <span>enkap</span>
          </div>
          <div className='description'>Simple password manager powered by Notion.</div>
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <section>
            <label htmlFor='key'>Notion Key</label>
            <input id='key' placeholder='Secret key' value={formKey} onChange={e => setFormKey(e.target.value)} />
          </section>
          <section>
            <label htmlFor='database'>Database ID</label>
            <input id='database' placeholder='Database ID' value={formDB} onChange={e => setFormDB(e.target.value)} />
          </section>
          <section>
            <button type='submit'>
              <i className='fas fa-check' />
              <span>Save</span>
            </button>
          </section>
        </form>
        <div className='info'>
          <p>Please provide the following values from your Notion account.</p>
          <br />
          <p>Check out the getting started <a href='https://developers.notion.com/docs/getting-started' target='_blank' rel='noreferrer'>article</a> in Notion for developers.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='app'>
      <div className='header'>
        <div className='title'>
          <i className='fas fa-grip' />
          <span>enkap</span>
        </div>
        <div className='description'>Simple password manager powered by Notion.</div>
        <div className='actions'>
          <div className='action'>
            <select value={theme} onChange={handleThemeChange}>
              {Object.keys(themes).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <a className='action refresh' href='/' onClick={handleRefresh}>
            <i className='fas fa-redo-alt' />
            <span>Refresh</span>
          </a>
        </div>
      </div>
      {error && (
        <div className='error'>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
      <div className='filter'>
        <i className='fas fa-search fa-lg icon' />
        <input className='input' placeholder='Filter by service' onChange={handleChangeFilter} />
      </div>
      {loading && (
        <div className='loading'>
          <i className='fas fa-fan fa-xl spinner' />
          <span>Loading</span>
        </div>
      )}
      {filteredData.length === 0 && (
        <div className='empty'>
          <i className='fas fa-martini-glass-empty fa-xl' />
          <span>No entries with current filter</span>
        </div>
      )}
      {filteredData.length > 0 && (
        <div className='items'>
          {filteredData.map(item => (
            <div className='item' key={item.id}>
              <div className='header'>{item.service}</div>
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

ReactDOM.render(<App />, document.getElementById('root'));
