import React from 'react';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import classnames from 'classnames';
import titleInitials from '../utils/title-initials';
import Paper from 'material-ui/Paper';
import colorFrom from '../utils/color-from';

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

const ChatMessage = ({ classes, sender, key, content }) => {
  const isMessageFromMe = sender === 'me';

  return (
    <div
      key={key}
      className={classnames(
        classes.messageWrapper,
        isMessageFromMe && classes.messageWrapperFromMe
      )}
    >
      <Avatar style={{ backgroundColor: colorFrom(sender) }}>
        {titleInitials(sender)}
      </Avatar>
      <Paper
        className={classnames(
          classes.message,
          isMessageFromMe && classes.messageFromMe
        )}
      >
        <Typography variant='caption'>{sender}</Typography>
        <Typography variant='body1'>{content}</Typography>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ChatMessage);
