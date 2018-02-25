import React from 'react';
import { withStyles } from 'material-ui/styles';
import ChatMessages from './ChatMessages';
import ChatInputField from './ChatInputField';

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
      <ChatMessages messages={messages} />
      <ChatInputField />
    </main>
  );
};

export default withStyles(styles)(ChatContent);
