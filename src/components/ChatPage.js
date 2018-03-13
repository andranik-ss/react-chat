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
    const { fetchMyChats, fetchAllChats } = this.props;

    Promise.all([fetchAllChats(), fetchMyChats()]);
  }

  render() {
    const {
      classes,
      chats,
      setActiveChat,
      logout,
      messages,
      user,
      editUser
    } = this.props;

    return (
      <div className={classes.root}>
        <ChatHeader logout={logout} user={user} editUser={editUser} />
        <Sidebar
          chats={chats}
          setActiveChat={setActiveChat}
        />
        <Chat messages={messages} />
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
