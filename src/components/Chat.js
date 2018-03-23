import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import ChatMessageList from './ChatMessageList';
import MessageInput from './MessageInput';
import InfoPaper from './InfoPaper';

const styles = theme => ({
  chatLayout: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
    height: '100%',
    overflow: 'hidden',
    width: 'calc(100% - 320px)',
  },
  messageInputWrapper: {
    position: 'fixed',
    left: 'auto',
    right: 0,
    bottom: 0,
    width: 'calc(100% - 320px)',
    padding: theme.spacing.unit * 3,
  },
  messageInput: {
    padding: theme.spacing.unit * 2,
  },
});

const ChatContent = ({
  classes, messages, user, actions, activeChat, isConnected,
}) => (
  <main className={classes.chatLayout}>
    {activeChat ? (
      <React.Fragment>
        <ChatMessageList messages={messages} user={user} />
        <div className={classes.messageInputWrapper}>
          <Paper className={classes.messageInput} elevation={6}>
            {user.isCreator || user.isMember ? (
              <MessageInput sendMessage={actions.sendMessage} disabled={!isConnected} />
            ) : (
              <Button
                variant="raised"
                color="primary"
                fullWidth
                onClick={actions.joinChat}
                disabled={!isConnected}
              >
                Join
              </Button>
            )}
          </Paper>
        </div>
      </React.Fragment>
    ) : (
      <InfoPaper />
    )}
  </main>
);

export default withStyles(styles)(ChatContent);
