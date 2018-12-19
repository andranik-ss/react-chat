/* eslint no-underscore-dangle: 0 */
import SocketIOClient from 'socket.io-client';
import * as types from '../constants/sockets';
import { redirect } from './services';
import config from '../config';

export const missingSocketConnection = () => ({
  type: types.SOCKETS_CONNECTION_MISSING,
  payload: new Error('Missing connection!'),
});

let socket = null;

export const socketsConnect = () => (dispatch, getState) => {
  const {
    services: { isFetching },
    auth: { token },
  } = getState();

  if (isFetching.sockets) {
    return Promise.resolve();
  }

  dispatch({
    type: types.SOCKETS_CONNECTION_REQUEST,
  });

  socket = SocketIOClient(config.SOCKETS_URI, {
    query: { token },
  });

  socket.on('connect', () => {
    dispatch({
      type: types.SOCKETS_CONNECTION_SUCCESS,
    });
  });

  socket.on('error', (error) => {
    dispatch({
      type: types.SOCKETS_CONNECTION_FAILURE,
      payload: new Error(`Connection: ${error}`),
    });
  });

  socket.on('connect_error', () => {
    dispatch({
      type: types.SOCKETS_CONNECTION_FAILURE,
      payload: new Error('We have lost a connection :('),
    });
  });

  socket.on('new-message', ({ message }) => {
    dispatch({
      type: types.RECIEVE_MESSAGE,
      payload: { message },
    });
  });

  socket.on('message-was-read', ({ message }) => {
    dispatch({
      type: types.RECIEVE_READ_MESSAGE,
      payload: { message },
    });
  });

  socket.on('new-chat', ({ chat }) => {
    dispatch({
      type: types.RECIEVE_NEW_CHAT,
      payload: { chat },
    });
  });

  socket.on('deleted-chat', ({ chat }) => {
    const { activeId } = getState().chats;

    dispatch({
      type: types.RECIEVE_DELETED_CHAT,
      payload: { chat },
    });

    if (activeId === chat._id) {
      dispatch(redirect('/chat'));
    }
  });

  return Promise.resolve();
};

export const sendMessage = (activeId, content) => (dispatch) => {
  if (!socket) {
    dispatch(missingSocketConnection());
  }

  socket.emit(
    'send-message',
    {
      chatId: activeId,
      content,
    },
    () => {
      dispatch({
        type: types.SEND_MESSAGE,
        payload: {
          chatId: activeId,
          content,
        },
      });
    },
  );
};

export const readMessage = (chatId, messageId) => (dispatch) => {
  if (!socket) {
    dispatch(missingSocketConnection());
  }
  // console.log('emit readMessage', chatId, messageId);
  socket.emit(
    'read-message',
    {
      chatId,
      messageId,
    },
    () => {
      dispatch({
        type: types.READ_MESSAGE,
        payload: {
          chatId,
          messageId,
        },
      });
    },
  );
};

export const mountChat = chatId => (dispatch) => {
  if (!socket) {
    dispatch(missingSocketConnection());
  }

  socket.emit('mount-chat', chatId);

  dispatch({
    type: types.MOUNT_CHAT,
    payload: { chatId },
  });
};
export const unmountChat = chatId => (dispatch) => {
  if (!socket) {
    dispatch(missingSocketConnection());
  }

  socket.emit('unmount-chat', chatId);

  dispatch({
    type: types.UNMOUNT_CHAT,
    payload: { chatId },
  });
};
