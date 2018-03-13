import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAllChats, fetchMyChats, setActiveChat } from '../actions/chats';
import { editUser } from '../actions/user';
import { logout } from '../actions/auth';
import * as fromChats from '../reducers/chats';
import ChatPage from '../components/ChatPage';

const mapStateToProps = state => ({
  chats: {
    all: fromChats.getByIds(state.chats, state.chats.allIds),
    my: fromChats.getByIds(state.chats, state.chats.myIds),
    activeId: state.chats.activeId
  },
  messages:
    state.chats.activeId !== ''
      ? fromChats.getMessagesById(state.chats, state.chats.activeId)
      : [],
  user: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllChats,
      fetchMyChats,
      setActiveChat,
      logout,
      editUser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
