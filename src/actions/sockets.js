import SocketIOClient from 'socket.io-client';
import * as types from '../constants/sockets';
import { redirect } from './services';

export const missingSocketConnection = () => ({
  type: types.SOCKETS_CONNECTION_MISSING,
  payload: new Error('Missing connection!')
});

let socket = null;

export const socketsConnect = () => {
  return (dispatch, getState) => {
    const { services: { isFetching }, auth: { token } } = getState();

    if (isFetching.sockets) {
      return Promise.resolve();
    }

    dispatch({
      type: types.SOCKETS_CONNECTION_REQUEST
    });

    socket = SocketIOClient('ws://localhost:8000/', {
      query: { token }
    });

    socket.on('connect', () => {
      dispatch({
        type: types.SOCKETS_CONNECTION_SUCCESS
      });
    });

    socket.on('error', error => {
      dispatch({
        type: types.SOCKETS_CONNECTION_FAILURE,
        payload: new Error(`Connection: ${error}`)
      });
    });

    socket.on('connect_error', () => {
      dispatch({
        type: types.SOCKETS_CONNECTION_FAILURE,
        payload: new Error('We have lost a connection :(')
      });
    });

    socket.on('new-message', ({ message }) => {
      dispatch({
        type: types.RECIEVE_MESSAGE,
        payload: { message }
      });
    });

    socket.on('new-chat', ({ chat }) => {
      dispatch({
        type: types.RECIEVE_NEW_CHAT,
        payload: { chat }
      });
    });

    socket.on('deleted-chat', ({ chat }) => {
      const { activeId } = getState().chats;

      dispatch({
        type: types.RECIEVE_DELETED_CHAT,
        payload: { chat }
      });

      if (activeId === chat._id) {
        dispatch(redirect('/chat'));
      }
    });
  };
};

export const sendMessage = (activeId, content) => {
  return (dispatch, getState) => {
    if (!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit(
      'send-message',
      {
        chatId: activeId,
        content
      },
      () => {
        dispatch({
          type: types.SEND_MESSAGE,
          payload: {
            chatId: activeId,
            content
          }
        });
      }
    );
  };
};

export const mountChat = chatId => {
  return (dispatch, getState) => {
    if (!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit('mount-chat', chatId);

    dispatch({
      type: types.MOUNT_CHAT,
      payload: { chatId }
    });
  };
};
export const unmountChat = chatId => {
  return (dispatch, getState) => {
    if (!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit('unmount-chat', chatId);

    dispatch({
      type: types.UNMOUNT_CHAT,
      payload: { chatId }
    });
  };
};
