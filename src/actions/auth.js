import callApi from '../utils/call-api';
import { redirect } from './services';
import * as types from '../constants/auth';

export function signup(username, password) {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if (isFetching.signup) {
      return Promise.resolve();
    }

    dispatch({
      type: types.SIGNUP_REQUEST,
    });

    return callApi('signup', undefined, { method: 'POST' }, { username, password })
      .then((json) => {
        if (!json.token) {
          throw new Error('Token has not been provided!');
        }

        // Save JWT to localStorage
        localStorage.setItem('token', json.token);

        dispatch({
          type: types.SIGNUP_SUCCESS,
          payload: json,
        });
      })
      .catch((reason) => {
        dispatch({
          type: types.SIGNUP_FAILURE,
          payload: reason,
        });
      });
  };
}

export function login(username, password) {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if (isFetching.login) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LOGIN_REQUEST,
    });

    return callApi('login', undefined, { method: 'POST' }, { username, password })
      .then((json) => {
        if (!json.token) {
          throw new Error('Token has not been provided!');
        }

        // Save JWT to localStorage
        localStorage.setItem('token', json.token);

        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: json,
        });
      })
      .catch(reason => dispatch({
        type: types.LOGIN_FAILURE,
        payload: reason,
      }));
  };
}

export function logout() {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if (isFetching.logout) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LOGOUT_REQUEST,
    });

    return callApi('logout')
      .then((json) => {
        localStorage.removeItem('token');
        dispatch({
          type: types.LOGOUT_SUCCESS,
          payload: json,
        });
        dispatch(redirect('/welcome'));
      })
      .catch(reason => dispatch({
        type: types.LOGOUT_FAILURE,
        payload: reason,
      }));
  };
}

export function receiveAuth() {
  return (dispatch, getState) => {
    const {
      services: { isFetching },
      auth: { token },
    } = getState();

    if (isFetching.receiveAuth) {
      return Promise.resolve();
    }

    if (!token) {
      return dispatch({
        type: types.RECEIVE_AUTH_FAILURE,
        payload: 'Authorization needed',
      });
    }

    dispatch({
      type: types.RECEIVE_AUTH_REQUEST,
    });

    return callApi('users/me', token)
      .then(json => dispatch({
        type: types.RECEIVE_AUTH_SUCCESS,
        payload: json,
      }))
      .catch((reason) => {
        dispatch({
          type: types.RECEIVE_AUTH_FAILURE,
          payload: reason,
        });
      });
  };
}
