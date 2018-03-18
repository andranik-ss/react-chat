import React from 'react';
import { withStyles } from 'material-ui/styles';
import ChatHeader from './ChatHeader';
import Sidebar from './Sidebar';
import Chat from './Chat';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default
  }
});

class ChatPage extends React.Component {
  componentDidMount() {
    const {
      actions: { fetchMyChats, fetchAllChats, setActiveChat },
      match: { params: { chatId: activeChatId } }
    } = this.props;

    Promise.all([fetchAllChats(), fetchMyChats()]).then(() => {
      if (activeChatId) {
        setActiveChat(activeChatId);
      }
    });
  }

  render() {
    const { classes, chats, messages, user, actions } = this.props;

    return (
      <div className={classes.root}>
        <ChatHeader user={user} actions={actions} activeChat={chats.active} />
        <Sidebar chats={chats} actions={actions} />
        <Chat
          messages={messages}
          user={user}
          actions={actions}
          activeChat={chats.active}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
