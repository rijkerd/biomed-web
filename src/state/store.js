import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    token: null,
    error: null,
  },
  reducers: {
    authStart(state) {
      return { ...state, loading: true, error: null };
    },
    authSuccess(state, action) {
      return { ...state, token: action.payload, loading: false };
    },
    authFail(state, action) {
      return { ...state, error: action.payload, loading: false };
    },
    authLogout(state) {
      return { ...state, token: null };
    },
  },
});

const moduleSlice = createSlice({
  name: 'module',
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {
    getAllModules(state, action) {
      return { ...state, data: action.payload };
    },
    moduleFail(state, action) {
      return { ...state, error: action.payload };
    },
  },
});

const topicSlice = createSlice({
  name: 'topic',
  initialState: {
    data: [],
    error: null,
  },
  reducers: {
    getAllTopics(state, action) {
      return { ...state, data: action.payload };
    },
    getAllTopicsFailed(state, action) {
      return { ...state, error: action.payload };
    },
  },
});

const resourceSlice = createSlice({
  name: 'resource',
  initialState: {
    data: [],
  },
  reducers: {
    getAllResources(state, action) {
      return { ...state, data: action.payload };
    },
  },
});

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  module: moduleSlice.reducer,
  topic: topicSlice.reducer,
  resource: resourceSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export const { actions } = moduleSlice;

export default store;

export const { dispatch } = store;
