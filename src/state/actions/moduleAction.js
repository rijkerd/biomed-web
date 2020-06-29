import axios from 'axios';
import {
  GET_MODULES,
  MODULES_FAIL,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAIL,
} from './actionTypes';
import { dispatch as storeDispatch } from '../store';

export const getAllTopics = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/v1/topics/`)
    .then((res) => {
      dispatch({ type: GET_TOPICS_SUCCESS, payload: res.data.results });
    })
    .catch((err) => {
      dispatch({ type: GET_TOPICS_FAIL, payload: err });
    });
};

export const getAllModules = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/v1/modules/`)
    .then((res) => {
      dispatch({ type: GET_MODULES, payload: res.data.results });
      dispatch(getAllTopics());
    })
    .catch((err) => {
      dispatch({ type: MODULES_FAIL, payload: err });
    });
};

export const wrappedModules = () => storeDispatch(getAllModules());
