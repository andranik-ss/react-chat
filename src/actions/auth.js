import fetch from 'isomorphic-fetch';
import * as types from '../constants';
import connectionSettings from '../config/connection-settings';

// Для возможности подмены строки соединения с react-chat-api
const api = connectionSettings ? connectionSettings['api'] : 'localhost:8000';

export function signup(username, password) {
  return dispatch => {
    dispatch({
      type: types.SIGNUP_REQUEST
    });

    return fetch(`http://${api}/v1/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(json => {
        if (!json.success) {
          throw new Error(json.message);
        }
        return json;
      })
      .then(json => {
        if (!json.token) {
          throw new Error('Token has not been provided!');
        }

        // Save JWT to localStorage
        localStorage.setItem('token', json.token);

        dispatch({
          type: types.SIGNUP_SUCCESS,
          payload: json
        });
      })
      .catch(reason => {
        dispatch({
          type: types.SIGNUP_FAILURE,
          payload: reason
        });
      });
  };
}

export function login(username, password) {
  return dispatch => {
    dispatch({
      type: types.LOGIN_REQUEST
    });

    return fetch(`http://${api}/v1/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(json => {
        if (!json.success) {
          throw new Error(json.message);
        }
        return json;
      })
      .then(json => {
        if (!json.token) {
          throw new Error('Token has not been provided!');
        }

        // Save JWT to localStorage
        localStorage.setItem('token', json.token);

        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: json
        });
      })
      .catch(reason =>
        dispatch({
          type: types.LOGIN_FAILURE,
          error: reason
        })
      );
  };
}

export function logout() {
  return dispatch => {
    dispatch({
      type: types.LOGOUT_REQUEST
    });

    return fetch(`http://${api}/v1/logout`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: ''
    })
      .then(response => response.json())
      .then(json => {
        if (!json.success) {
          throw new Error(json.message);
        }
        return json;
      })
      .then(json =>
        dispatch({
          type: types.LOGOUT_SUCCESS
        })
      )
      .catch(reason =>
        dispatch({
          type: types.LOGOUT_FAILURE,
          payload: reason
        })
      );
  };
}

export function receiveAuth() {
  return (dispatch, getState) => {
    dispatch({
      type: types.RECEIVE_AUTH_REQUEST
    });

    const { token } = getState().auth;

    return fetch(`http://${api}/v1/users/me`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      // simulate delay from api
      .then(
        response =>
          new Promise(resolve => setTimeout(() => resolve(response), 500))
      )
      .then(response => response.json())
      .then(json => {
        if (!json.success) {
          throw new Error(json.message);
        }
        return json;
      })
      .then(json =>
        dispatch({
          type: types.RECEIVE_AUTH_SUCCESS,
          payload: json
        })
      )
      .catch(reason => {
        dispatch({
          type: types.RECEIVE_AUTH_FAILURE,
          payload: reason
        });
      });
  };
}
