import axios from 'axios';
import {
  GET_MODULES,
  MODULES_FAIL,
  GET_TOPICS_SUCCESS,
  GET_TOPICS_FAIL,
  GET_RESOURCES,
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

export const getAllResources = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/v1/resources/`)
    .then((res) => {
      dispatch({ type: GET_RESOURCES, payload: res.data.results });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllModules = () => (dispatch) => {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/v1/modules/`)
    .then((res) => {
      dispatch({ type: GET_MODULES, payload: res.data.results });
      dispatch(getAllTopics());
      dispatch(getAllResources());
    })
    .catch((err) => {
      dispatch({ type: MODULES_FAIL, payload: err });
    });
};

export const wrappedModules = () => storeDispatch(getAllModules());
