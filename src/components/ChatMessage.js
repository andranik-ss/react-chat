import React from 'react';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import classnames from 'classnames';
import titleInitials from '../utils/title-initials';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  messageWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`
  },
  messageWrapperFromMe: {
    justifyContent: 'flex-end'
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

const ChatMessage = ({ classes, message, index }) => {
  const isMessageFromMe = message.sender === 'me';

  const userAvatar = <Avatar>{titleInitials(message.sender)}</Avatar>;

  return (
    <div
      key={index}
      className={classnames(
        classes.messageWrapper,
        isMessageFromMe && classes.messageWrapperFromMe
      )}
    >
      {!isMessageFromMe && userAvatar}
      <Paper
        className={classnames(
          classes.message,
          isMessageFromMe && classes.messageFromMe
        )}
      >
        <Typography variant='caption'>{message.sender}</Typography>
        <Typography variant='body1'>{message.content}</Typography>
      </Paper>
      {isMessageFromMe && userAvatar}
    </div>
  );
};

export default withStyles(styles)(ChatMessage);
