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

export function fetchChat(chatId) {
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
        dispatch(redirect('/chat'));

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

export function createChat(newChat) {
  return (dispatch, getState) => {
    dispatch({
      type: types.CREATE_NEW_CHAT_REQUEST,
      payload: newChat
    });

    const { token } = getState().auth;

    return callApi(
      '/chats',
      token,
      { method: 'POST' },
      { data: { title: newChat } }
    )
      .then(data => {
        dispatch({
          type: types.CREATE_NEW_CHAT_SUCCESS,
          payload: data
        });

        dispatch({
          type: types.SET_ACTIVE_CHAT,
          payload: data
        });
        dispatch(redirect(`/chat/${data.chat._id}`));

        return data;
      })
      .catch(reason =>
        dispatch({
          type: types.CREATE_NEW_CHAT_FAILURE,
          payload: reason
        })
      );
  };
}

export function joinChat(chatId) {
  return (dispatch, getState) => {
    dispatch({
      type: types.JOIN_CHAT_REQUEST,
      payload: chatId
    });

    const { token } = getState().auth;

    return callApi(`/chats/${chatId}/join`, token)
      .then(data => {
        dispatch({
          type: types.JOIN_CHAT_SUCCESS,
          payload: data
        });

        return data;
      })
      .catch(reason =>
        dispatch({
          type: types.JOIN_CHAT_FAILURE,
          payload: reason
        })
      );
  };
}
export function leaveChat(chatId) {
  return (dispatch, getState) => {
    dispatch({
      type: types.LEAVE_CHAT_REQUEST,
      payload: chatId
    });

    const { token } = getState().auth;

    return callApi(`/chats/${chatId}/leave`, token)
      .then(data => {
        dispatch({
          type: types.LEAVE_CHAT_SUCCESS,
          payload: data
        });

        return data;
      })
      .catch(reason =>
        dispatch({
          type: types.LEAVE_CHAT_FAILURE,
          payload: reason
        })
      );
  };
}
export function deleteChat(chatId) {
  return (dispatch, getState) => {
    dispatch({
      type: types.DELETE_CHAT_REQUEST,
      payload: chatId
    });

    const { token } = getState().auth;

    return callApi(`/chats/${chatId}`, token, { method: 'DELETE' })
      .then(data => {
        dispatch({
          type: types.DELETE_CHAT_SUCCESS,
          payload: data
        });

        dispatch(redirect('/chat'));

        dispatch({
          type: types.UNSET_ACTIVE_CHAT
        });

        return data;
      })
      .catch(reason =>
        dispatch({
          type: types.DELETE_CHAT_FAILURE,
          payload: reason
        })
      );
  };
}
