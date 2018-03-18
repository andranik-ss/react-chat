import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Avatar from './Avatar';
import getColor from '../utils/color-from';

const styles = theme => ({
  messageWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`
  },
  messageWrapperFromMe: {
    flexDirection: 'row-reverse'
  },
  message: {
    maxWidth: '70%',
    minWidth: '10%',
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2
  },
  messageFromMe: {
    marginRight: theme.spacing.unit * 2,
    backgroundColor: '#e6dcff'
  }
});

const ChatMessage = ({ classes, sender, user, content, createdAt }) => {
  const isMessageFromMe = sender._id === user.active._id;

  const getSenderName = ({ firstName, lastName, username }) =>
    firstName && lastName ? `${sender.firstName} ${sender.lastName}` : username;

  return (
    <div
      className={classnames(
        classes.messageWrapper,
        isMessageFromMe && classes.messageWrapperFromMe
      )}
    >
      <Avatar colorFrom={sender._id}>{getSenderName(sender)}</Avatar>
      <Paper
        className={classnames(
          classes.message,
          isMessageFromMe && classes.messageFromMe
        )}
      >
        <Typography variant='caption' style={{ color: getColor(sender._id) }}>
          {getSenderName(sender)}
        </Typography>
        <Typography variant='body1'>{content}</Typography>
        <Typography variant='caption' component='span'>
          {moment(createdAt).fromNow()}
        </Typography>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ChatMessage);
