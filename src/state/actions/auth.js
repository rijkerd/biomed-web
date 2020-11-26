import axios from 'axios';
import pick from 'lodash/pick';
import * as actionTypes from './actionTypes';
import { dispatch as storeDispatch } from '../store';
import { wrappedModules } from './moduleAction';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error,
  };
};

export const logout = () => (dispatch) => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('access_token');
  axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/auth/token/logout/`,
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
    .then(() => {
      localStorage.removeItem('access_token'); // eslint-disable-line no-undef

      dispatch({ type: actionTypes.AUTH_LOGOUT });
    });
};

export const wrappedLogout = () => storeDispatch(logout());

export const authLogin = (credentials, onSuccess, onError) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/token/login/`, credentials)
      .then((res) => {
        const token = res.data.auth_token;
        // eslint-disable-next-line no-undef
        localStorage.setItem('access_token', token);
        dispatch(authSuccess(token));
        wrappedModules();
        onSuccess();
      })
      .catch((err) => {
        dispatch(authFail(err));
        onError(err);
      });
  };
};

export const wrappedAuthLogin = (credentials, onSuccess, onError) =>
  storeDispatch(authLogin(credentials, onSuccess, onError));

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/rest-auth/registration/`, {
        username,
        email,
        password1,
        password2,
      })
      .then((res) => {
        const token = pick(res, ['auth_token']);
        localStorage.setItem('token', token); // eslint-disable-line no-undef
        dispatch(authSuccess(token));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
