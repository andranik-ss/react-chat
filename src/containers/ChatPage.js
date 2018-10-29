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
    },
    messages: fromMessages.getMessages(state),
    user: {
      ...state.auth.user,
      isCreator: fromChats.isChatCreator(activeChat, state.auth.user),
      isMember: fromChats.isChatMember(activeChat, state.auth.user),
    },
    error: state.services.errors.chat,
    isConnected: state.services.isConnected,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...chatActions,
    logout,
    editUser,
    ...socketActions,
  },
  dispatch,
);

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const activeChatId = ownProps.match.params.chatId;

  return {
    ...stateProps,
    ...ownProps,
    actions: {
      ...dispatchProps,
      joinChat: () => dispatchProps.joinChat(activeChatId),
      leaveChat: () => dispatchProps.leaveChat(activeChatId),
      deleteChat: () => dispatchProps.deleteChat(activeChatId),
      sendMessage: content => dispatchProps.sendMessage(activeChatId, content),
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  )(ChatPage),
);
