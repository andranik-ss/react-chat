import * as types from '../constants/messages';
import callApi from '../utils/call-api';
import { fetchChat } from './chats'

export function sendMessage(chatId, content) {
  return (dispatch, getState) => {
    const { token } = getState().auth;

    dispatch({
      type: types.SEND_MESSAGE_REQUEST,
      payload: { chatId, content }
    });

    return callApi(
      `/chats/${chatId}`,
      token,
      { method: 'POST' },
      { data: { content } }
    )
      .then(data => {
        dispatch({
          type: types.SEND_MESSAGE_SUCCESS,
          payload: data
        });

        dispatch(fetchChat(chatId));
      })
      .catch(reason =>
        dispatch({
          type: types.SEND_MESSAGE_FAILURE,
          payload: reason
        })
      );
  };
}
