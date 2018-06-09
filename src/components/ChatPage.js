import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ChatHeader from './ChatHeader';
import Sidebar from './Sidebar';
import Chat from './Chat';
import ErrorMessage from './ErrorMessage';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
});

class ChatPage extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }).isRequired,
    chats: PropTypes.shape({
      my: PropTypes.array.isRequired,
      all: PropTypes.array.isRequired,
      active: PropTypes.object,
    }).isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string.isRequired,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
    }).isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      chatId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.object.isRequired,
      createdAt: PropTypes.string.isRequired,
    })).isRequired,
    error: PropTypes.instanceOf(Error),
    isConnected: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      fetchMyChats: PropTypes.func.isRequired,
      fetchAllChats: PropTypes.func.isRequired,
      setActiveChat: PropTypes.func.isRequired,
      joinChat: PropTypes.func.isRequired,
      deleteChat: PropTypes.func.isRequired,
      leaveChat: PropTypes.func.isRequired,
      createChat: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      sendMessage: PropTypes.func.isRequired,
      socketsConnect: PropTypes.func.isRequired,
      mountChat: PropTypes.func.isRequired,
      unmountChat: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    error: null,
  };

  state = {
    open: true,
  };

  componentDidMount() {
    const {
      actions: {
        fetchMyChats, fetchAllChats, setActiveChat, socketsConnect, mountChat,
      },
      match: {
        params: { chatId: activeChatId },
      },
    } = this.props;

    Promise.all([fetchAllChats(), fetchMyChats()])
      .then(() => socketsConnect())
      .then(() => {
        if (activeChatId) {
          setActiveChat(activeChatId);
          mountChat(activeChatId);
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: { params },
      actions: { setActiveChat, unmountChat, mountChat },
    } = this.props;
    const { params: nextParams } = nextProps.match;

    if (nextParams.chatId && params.chatId !== nextParams.chatId) {
      setActiveChat(nextParams.chatId);
      unmountChat(params.chatId);
      mountChat(nextParams.chatId);
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes, chats, messages, user, actions, error, isConnected,
    } = this.props;

    const hasShift = this.state.open;

    actions.openSidebar = this.handleDrawerOpen;
    actions.closeSidebar = this.handleDrawerClose;

    return (
      <div className={classes.root}>
        <Sidebar chats={chats} actions={actions} isConnected={isConnected} open={hasShift} />
        <ChatHeader
          user={user}
          actions={actions}
          activeChat={chats.active}
          isConnected={isConnected}
          hasShift={hasShift}
        />
        <Chat
          messages={messages}
          user={user}
          actions={actions}
          activeChat={chats.active}
          isConnected={isConnected}
          hasShift={hasShift}
        />
        <ErrorMessage error={error} />
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
