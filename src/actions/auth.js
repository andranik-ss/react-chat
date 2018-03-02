import fetch from 'isomorphic-fetch';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../constants';

export function signup(username, password) {
  return dispatch => {
    dispatch({
      type: SIGNUP_REQUEST
    });

    return fetch('http://localhost:8000/v1/signup', {
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
          type: SIGNUP_SUCCESS,
          payload: json
        });
      })
      .catch(reason => {
        dispatch({
          type: SIGNUP_FAILURE,
          payload: reason
        });
      });
  };
}

export function login(username, password) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST
    });

    return fetch('http://localhost:8000/v1/login', {
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
          type: LOGIN_SUCCESS,
          payload: json
        });
      })
      .catch(reason =>
        dispatch({
          type: LOGIN_FAILURE,
          error: reason
        })
      );
  };
}

export function logout() {
  return dispatch => {
    dispatch({
      type: LOGOUT_REQUEST
    });

    return fetch('http://localhost:8000/v1/logout', {
      method: 'POST',
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
          type: LOGOUT_SUCCESS
        })
      )
      .catch(reason =>
        dispatch({
          type: LOGOUT_FAILURE,
          payload: reason
        })
      );
  };
}
