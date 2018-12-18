import moment from 'moment';
import * as types from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECIEVE_MESSAGE:
    case types.RECIEVE_READ_MESSAGE:
      return [...state, action.payload.message];
    case types.FETCH_CHAT_SUCCESS:
      return action.payload.chat.messages;
    case types.FETCH_CHAT_REQUEST:
      return null;
    default:
      return state;
  }
};

// eslint-disable-next-line
export const getMessages = state => {
  let savedDate = new Date(2018, 1, 1);
  return (
    state.messages
    && state.messages
      .filter(message => message.chatId === state.chats.activeId)
      .reduce((messages, current, index) => {
        const currentDate = new Date(current.createdAt);
        if (savedDate && moment(savedDate).isBefore(currentDate, 'day')) {
          const timeMessage = {
            ...current,
            sender: {
              ...current.sender,
              username: '',
              firstName: '',
              lastName: '',
            },
            statusMessage: true,
            createdAt: '',
            content: moment(currentDate).format('LL'),
            _id: index,
          };
          savedDate = currentDate;
          return [...messages, timeMessage, current];
        }
        return [...messages, current];
      }, [])
  );
};

// eslint-disable-next-line
const getUserId = user => user._id;

export const getUnreadMessages = (state) => {
  const userId = state.auth.user && getUserId(state.auth.user);
  return (
    state.messages
    && state.chats.allIds.reduce((byIds, chatId) => {
      const unread = state.messages
        .filter(message => message.chatId === chatId)
        .reduce((count, message) => count + (message.hasRead.includes(userId) ? 0 : 1), 0);
      return { ...byIds, [chatId]: unread };
    }, {})
  );
};
