import { configureStore, createSlice } from '@reduxjs/toolkit';
import { themes, loadTheme } from '../themes';

const defaultState = {
  settingsOpen: false,
  loading: false,
  data: [],
  themes: Object.keys(themes),
  currentTheme: localStorage.getItem('THEME') || 'bento',
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
    toggleSettings: (state) => {
      state.settingsOpen = !state.settingsOpen;
    },
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
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
} = appSlice.actions;

// todo: API call
export const loadData = () => (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setData([]));

  setTimeout(() => {
    const data = JSON.parse(localStorage.getItem('NOTION_DATA'));
    dispatch(setLoading(false));
    dispatch(setData(data || []));
  }, 1000);
};

export const changeTheme = (themeName = 'bento') => (dispatch) => {
  dispatch(setTheme(themeName));
  localStorage.setItem('THEME', themeName);
  loadTheme(themeName);
};

store.dispatch(loadData());
store.dispatch(changeTheme(defaultState.currentTheme));
