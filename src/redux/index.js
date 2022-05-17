import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Client } from '@notionhq/client';
import { themes, loadTheme } from '../themes';
import { readPropertyValue } from '../utils';

const defaultState = {
  settingsOpen: false,
  loading: false,
  data: [],
  themes: Object.keys(themes),
  currentTheme: localStorage.getItem('THEME') || 'bento',
  api: {
    key: localStorage.getItem('NOTION_KEY'),
    db: localStorage.getItem('NOTION_DB'),
  },
  apiError: undefined,
};

const appSlice = createSlice({
  name: 'app',
  initialState: defaultState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    toggleSettings: (state, action) => {
      if (action.payload !== undefined) {
        state.settingsOpen = action.payload;
        return;
      }
      state.settingsOpen = !state.settingsOpen;
    },
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
    },
    setApiValues: (state, action) => {
      state.api.key = action.payload.key;
      state.api.db = action.payload.db;
    },
    setApiError: (state, action) => {
      state.apiError = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export const {
  setData,
  setLoading,
  toggleSettings,
  setTheme,
  setApiValues,
  setApiError,
} = appSlice.actions;

export const loadData = () => async (dispatch, getState) => {
  dispatch(setApiError(undefined));
  dispatch(setLoading(true));
  dispatch(setData([]));

  const { key, db } = getState().app.api;

  if (!key || !db) {
    dispatch(setLoading(false));
    dispatch(toggleSettings(true));
    dispatch(setApiError('No API credentials provided.'));
    return;
  }

  const notion = new Client({ auth: key });

  try {
    const response = await notion.databases.query({
      database_id: db,
      sorts: [
        { property: 'Service', direction: 'ascending' },
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

    dispatch(setData(data || []));
  } catch (error) {
    dispatch(setApiError(error.message));
  }

  dispatch(setLoading(false));
};

export const changeTheme = (themeName = 'bento') => (dispatch) => {
  dispatch(setTheme(themeName));
  localStorage.setItem('THEME', themeName);
  loadTheme(themeName);
};

export const updateAPIValues = (key, db) => (dispatch) => {
  dispatch(setApiValues({ key, db }));

  localStorage.setItem('NOTION_KEY', key);
  localStorage.setItem('NOTION_DB', db);

  dispatch(loadData());
};

store.dispatch(loadData());
store.dispatch(changeTheme(defaultState.currentTheme));
