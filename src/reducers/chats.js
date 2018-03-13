import * as types from '../constants/chats';
import { combineReducers } from 'redux';

function activeId(state = '', action) {
  switch (action.type) {
    case types.SET_ACTIVE_CHAT:
      return getId(action.payload.chat);
    case types.UNSET_ACTIVE_CHAT:
      return '';
    default:
      return state;
  }
}
function allIds(state = [], action) {
  switch (action.type) {
    case types.FETCH_ALL_CHATS_SUCCESS:
      return action.payload.chats.map(chat => getId(chat));
    default:
      return state;
  }
}

function myIds(state = [], action) {
  switch (action.type) {
    case types.FETCH_MY_CHATS_SUCCESS:
      return action.payload.chats.map(chat => getId(chat));
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
            [current._id]: current
          }),
          {}
        )
      };
    default:
      return state;
  }
}

export default combineReducers({
  activeId,
  allIds,
  myIds,
  byIds
});

export const getId = chat => chat._id;
export const getByIds = (state, ids) => ids.map(id => state.byIds[id]);
export const getMessagesById = (state, id) =>
  state.byIds[id].messages ? state.byIds[id].messages : [];
