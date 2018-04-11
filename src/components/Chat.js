import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import ChatMessageList from './ChatMessageList';
import MessageInput from './MessageInput';
import InfoPaper from './InfoPaper';

const styles = theme => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
    marginLeft: -theme.drawerWidth,
    [theme.breakpoints.down('md')]: {
      marginLeft: -theme.drawerWidth * 0.75,
    },
  },
  'content-shift': {
    [theme.breakpoints.up('sm')]: {
      marginLeft: 0,
    },
  },
  messageInputWrapper: {
    position: 'fixed',
    left: 'auto',
    right: 0,
    bottom: 0,
    width: '100%',
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
  messageInput: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing.unit * 1.5,
    },
  },
  messageInputShift: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
  },
});

const Chat = ({
  classes, messages, user, actions, activeChat, isConnected, hasShift,
}) => (
  <main className={classNames(classes.content, hasShift && classes['content-shift'])}>
    {activeChat ? (
      <React.Fragment>
        <ChatMessageList messages={messages} user={user} />
        <div
          className={classNames(classes.messageInputWrapper, hasShift && classes.messageInputShift)}
        >
          <Paper className={classes.messageInput} elevation={6}>
            {user.isCreator || user.isMember ? (
              <MessageInput sendMessage={actions.sendMessage} disabled={!isConnected} />
            ) : (
              <Button
                variant='raised'
                color='primary'
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

Chat.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  activeChat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
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
  isConnected: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    joinChat: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
  }).isRequired,
  hasShift: PropTypes.bool.isRequired,
};

Chat.defaultProps = {
  activeChat: null,
};

export default withStyles(styles)(Chat);
