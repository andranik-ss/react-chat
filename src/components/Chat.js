import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ChatMessageList from './ChatMessageList';
import MessageInput from './MessageInput';

const styles = theme => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  'content-shift': {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.drawerWidth,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: theme.drawerWidth * 0.75,
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
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: `calc(100% - ${theme.drawerWidth * 0.75}px)`,
    },
  },
});

const Chat = ({
  classes, messages, user, actions, isConnected, hasShift,
}) => (
  <React.Fragment>
    <ChatMessageList messages={messages} user={user} readMessage={actions.readMessage} />
    <div className={classNames(classes.messageInputWrapper, hasShift && classes.messageInputShift)}>
      <Paper className={classes.messageInput} elevation={6}>
        {user.isCreator || user.isMember ? (
          <MessageInput sendMessage={actions.sendMessage} disabled={!isConnected} />
        ) : (
          <Button
            variant='contained'
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
);

Chat.defaultProps = {
  messages: null,
};

Chat.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string.isRequired,
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
  }).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      chatId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.object.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ),
  isConnected: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    joinChat: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
  }).isRequired,
  hasShift: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Chat);
