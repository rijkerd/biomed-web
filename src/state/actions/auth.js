import axios from 'axios';
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
  axios.post(`${process.env.REACT_APP_BASE_URL}/rest-auth/logout/`).then(() => {
    localStorage.removeItem('token'); // eslint-disable-line no-undef
    localStorage.removeItem('expirationDate'); // eslint-disable-line no-undef

    dispatch({ type: actionTypes.AUTH_LOGOUT });
  });
};

export const wrappedLogout = () => storeDispatch(logout());

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (credentials, onSuccess, onError) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/rest-auth/login/`, credentials)
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', token); // eslint-disable-line no-undef
        localStorage.setItem('expirationDate', expirationDate); // eslint-disable-line no-undef
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
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
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', token); // eslint-disable-line no-undef
        localStorage.setItem('expirationDate', expirationDate); // eslint-disable-line no-undef
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token'); // eslint-disable-line no-undef
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate')); // eslint-disable-line no-undef
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
