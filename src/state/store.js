import { createSlice, configureStore } from '@reduxjs/toolkit';

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

const store = configureStore({
  reducer: authSlice.reducer,
  devTools: true,
});

export default store;

export const { dispatch } = store;
