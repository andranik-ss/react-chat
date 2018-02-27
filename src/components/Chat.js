import React from 'react';
import { withStyles } from 'material-ui/styles';
import ChatMessageList from './ChatMessageList';
import MessageInput from './MessageInput';

const styles = theme => ({
  chatLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
    height: '100%',
    overflow: 'hidden',
    width: 'calc(100% - 320px)'
  }
});

const ChatContent = ({ classes, messages }) => {
  return (
    <main className={classes.chatLayout}>
      <ChatMessageList messages={messages} />
      <MessageInput />
    </main>
  );
};

export default withStyles(styles)(ChatContent);
