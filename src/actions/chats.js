import callApi from '../utils/call-api';
import * as types from '../constants/chats';

export function fetchAllChats() {
  return (dispatch, getState) => {
    dispatch({
      type: types.FETCH_ALL_CHATS_REQUEST
    });

    const { token } = getState().auth;

    return callApi('chats', token)
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

    return callApi('chats', token)
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

export function fetchChat(chatId) {
  return (dispatch, getState) => {};
}

export function setActiveChat(chatId) {
  return (dispatch, getState) => {};
}
