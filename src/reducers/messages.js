import moment from 'moment';
import * as types from '../constants';

const initialState = [];

// eslint-disable-next-line
const getId = obj => obj._id;

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECIEVE_MESSAGE:
    case types.RECIEVE_READ_MESSAGE:
      return [
        ...state.filter(i => getId(i) !== getId(action.payload.message)),
        action.payload.message,
      ];
    case types.FETCH_CHAT_SUCCESS:
      // eslint-disable-next-line
      const newMessages = action.payload.chat.messages.filter(
        i => state.findIndex(a => getId(i) === getId(a)) === -1,
      );
      if (newMessages.length > 0) {
        return [...state, ...newMessages];
      }
      return state;
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
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
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
            timeMessage: true,
            _id: index,
          };
          savedDate = currentDate;
          return [...messages, timeMessage, current];
        }
        return [...messages, current];
      }, [])
  );
};
