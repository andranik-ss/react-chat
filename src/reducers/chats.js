/*
eslint no-use-before-define: 0,
eslint no-max-len: 0,
eslint no-underscore-dangle: 0
*/
import { combineReducers } from 'redux';
import * as types from '../constants';

function activeId(state = '', action) {
  switch (action.type) {
    case types.SET_ACTIVE_CHAT:
      return action.payload;
    case types.UNSET_ACTIVE_CHAT:
    case types.DELETE_CHAT_SUCCESS:
      return null;
    case types.RECIEVE_DELETED_CHAT:
      return state === getId(action.payload.chat) ? null : state;
    default:
      return state;
  }
}
function allIds(state = [], action) {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
      return action.payload.chats.map(chat => getId(chat));
    case types.DELETE_CHAT_SUCCESS:
    case types.RECIEVE_DELETED_CHAT:
      return state.filter(chatId => chatId !== getId(action.payload.chat));
    case types.RECIEVE_NEW_CHAT:
      return [...state, getId(action.payload.chat)];
    default:
      return state;
  }
}

function myIds(state = [], action) {
  switch (action.type) {
    case types.FETCH_MY_CHATS_SUCCESS:
      return action.payload.chats.map(chat => getId(chat));
    case types.JOIN_CHAT_SUCCESS:
    case types.CREATE_CHAT_SUCCESS:
      return [...state].concat(getId(action.payload.chat));
    case types.LEAVE_CHAT_SUCCESS:
    case types.DELETE_CHAT_SUCCESS:
    case types.RECIEVE_DELETED_CHAT:
      return state.filter(chatId => chatId !== getId(action.payload.chat));
    default:
      return state;
  }
}

function byIds(state = {}, action) {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
    case types.FETCH_MY_CHATS_SUCCESS:
      return {
        ...state,
        ...action.payload.chats.reduce(
          (chats, current) => ({
            ...chats,
            [getId(current)]: current,
          }),
          {},
        ),
      };
    case types.JOIN_CHAT_SUCCESS:
    case types.CREATE_CHAT_SUCCESS:
    case types.LEAVE_CHAT_SUCCESS:
    case types.RECIEVE_NEW_CHAT:
      return {
        ...state,
        [getId(action.payload.chat)]: action.payload.chat,
      };
    case types.DELETE_CHAT_SUCCESS:
    case types.RECIEVE_DELETED_CHAT: {
      const newState = { ...state };
      delete newState[getId(action.payload.chat)];
      return newState;
    }
    default:
      return state;
  }
}

export default combineReducers({
  activeId,
  allIds,
  myIds,
  byIds,
});

export const getId = chat => chat._id; // eslint-disable-line
export const getByIds = (state, ids) => ids.map(id => state.byIds[id]);
export const getMessagesById = (state, id) =>
  (state.byIds[id].messages ? state.byIds[id].messages : []); // eslint-disable-line

export const isChatCreator = (chat, user) => {
  try {
    return getId(user) === getId(chat.creator);
  } catch (e) {
    return false;
  }
};

export const isChatMember = (chat, user) => {
  try {
    return chat.members.some(member => getId(member) === getId(user));
  } catch (e) {
    return false;
  }
};
