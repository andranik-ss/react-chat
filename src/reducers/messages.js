import moment from 'moment';
import * as types from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.RECIEVE_MESSAGE:
      return [...state, action.payload.message];
    case types.FETCH_CHAT_SUCCESS:
      return action.payload.chat.messages;
    default:
      return state;
  }
};

// eslint-disable-next-line
export const getMessages = state => {
  let savedDate = new Date(2018, 1, 1);
  return (
    state.messages &&
    state.messages.reduce((messages, current, index) => {
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
