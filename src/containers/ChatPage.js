import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as chatActions from '../actions/chats';
import * as socketActions from '../actions/sockets';
import { editUser } from '../actions/user';
import { logout } from '../actions/auth';
import * as fromChats from '../reducers/chats';
import * as fromMessages from '../reducers/messages';
import ChatPage from '../components/ChatPage';

const mapStateToProps = (state, ownProps) => {
  const activeChat = state.chats.byIds[ownProps.match.params.chatId];

  return {
    chats: {
      all: fromChats.getByIds(state.chats, state.chats.allIds),
      my: fromChats.getByIds(state.chats, state.chats.myIds),
      active: activeChat,
      unread: fromMessages.getUnreadMessages(state),
    },
    messages: fromMessages.getMessages(state),
    user: {
      ...state.auth.user,
      isCreator: fromChats.isChatCreator(activeChat, state.auth.user),
      isMember: fromChats.isChatMember(activeChat, state.auth.user),
    },
    error: state.services.errors.chat,
    isConnected: state.services.isConnected,
    isFetching: Object.values(state.services.isFetching).includes(true),
    ...ownProps,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: {
    ...bindActionCreators(
      {
        ...chatActions,
        ...socketActions,
        joinChat: () => chatActions.joinChat(ownProps.match.params.chatId),
        leaveChat: () => chatActions.leaveChat(ownProps.match.params.chatId),
        deleteChat: () => chatActions.deleteChat(ownProps.match.params.chatId),
        sendMessage: content => socketActions.sendMessage(ownProps.match.params.chatId, content),
        logout,
        editUser,
      },
      dispatch,
    ),
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChatPage),
);
