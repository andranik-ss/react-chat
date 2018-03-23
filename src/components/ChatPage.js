import React from 'react';
import { withStyles } from 'material-ui/styles';
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
  componentDidMount() {
    const {
      actions: {
        fetchMyChats, fetchAllChats, setActiveChat, socketsConnect, mountChat,
      },
      match: { params: { chatId: activeChatId } },
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
    const { match: { params }, actions: { setActiveChat, unmountChat, mountChat } } = this.props;
    const { params: nextParams } = nextProps.match;

    if (nextParams.chatId && params.chatId !== nextParams.chatId) {
      setActiveChat(nextParams.chatId);
      unmountChat(params.chatId);
      mountChat(nextParams.chatId);
    }
  }

  render() {
    const {
      classes, chats, messages, user, actions, error, isConnected,
    } = this.props;

    return (
      <div className={classes.root}>
        <ChatHeader
          user={user}
          actions={actions}
          activeChat={chats.active}
          isConnected={isConnected}
        />
        <Sidebar chats={chats} actions={actions} isConnected={isConnected} />
        <Chat
          messages={messages}
          user={user}
          actions={actions}
          activeChat={chats.active}
          isConnected={isConnected}
        />
        <ErrorMessage error={error} />
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
