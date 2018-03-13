import callApi from '../utils/call-api';
import { redirect } from './services';
import * as types from '../constants/chats';

export function fetchAllChats() {
  return (dispatch, getState) => {
    dispatch({
      type: types.FETCH_ALL_CHATS_REQUEST
    });

    const { token } = getState().auth;

    return callApi('/chats', token)
      .then(json =>
        dispatch({
          type: types.FETCH_ALL_CHATS_SUCCESS,
          payload: json
        })
      )
      .catch(reason =>
        dispatch({
          type: types.FETCH_ALL_CHATS_FAILURE,
          payload: reason
        })
      );
  };
}

export function fetchMyChats() {
  return (dispatch, getState) => {
    dispatch({
      type: types.FETCH_MY_CHATS_REQUEST
    });

    const { token } = getState().auth;

    return callApi('/chats/my', token)
      .then(json =>
        dispatch({
          type: types.FETCH_MY_CHATS_SUCCESS,
          payload: json
        })
      )
      .catch(reason =>
        dispatch({
          type: types.FETCH_MY_CHATS_FAILURE,
          payload: reason
        })
      );
  };
}

function fetchChat(chatId) {
  return (dispatch, getState) => {
    dispatch({
      type: types.FETCH_CHAT_REQUEST,
      payload: chatId
    });

    const { token } = getState().auth;

    return callApi(`/chats/${chatId}`, token)
      .then(data => {
        dispatch({
          type: types.FETCH_CHAT_SUCCESS,
          payload: data
        });

        return data;
      })
      .catch(reason =>
        dispatch({
          type: types.FETCH_CHAT_FAILURE,
          payload: reason
        })
      );
  };
}

export function setActiveChat(chatId) {
  return dispatch => {
    return dispatch(fetchChat(chatId)).then(data => {
      if (!data) {
        dispatch(redirect('/chats'));

        dispatch({
          type: types.UNSET_ACTIVE_CHAT,
          payload: chatId
        });
      }

      dispatch({
        type: types.SET_ACTIVE_CHAT,
        payload: data
      });
    });
  };
}

export function createChat() {
  return dispatch => {};
}
export function joinChat() {
  return dispatch => {};
}
export function leaveChat() {
  return dispatch => {};
}
export function deleteChat() {
  return dispatch => {};
}
