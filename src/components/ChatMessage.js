/* eslint no-underscore-dangle: 0 */
import React from 'react';
import PropTypes from 'prop-types';
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
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
  },
  messageWrapperFromMe: {
    flexDirection: 'row-reverse',
  },
  message: {
    maxWidth: '70%',
    minWidth: '10%',
    padding: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 2,
  },
  messageFromMe: {
    marginRight: theme.spacing.unit * 2,
    backgroundColor: '#e6dcff',
  },
  statusMessage: {
    width: '100%',
    textAlign: 'center',
  },
  statusMessageUser: {
    display: 'inline',
  },
});

const ChatMessage = ({
  classes, sender, user, content, createdAt, statusMessage,
}) => {
  const isMessageFromMe = sender._id === user._id;

  const getSenderName = ({ firstName, lastName, username }) =>
    (firstName && lastName ? `${sender.firstName} ${sender.lastName}` : username);

  if (statusMessage) {
    return (
      <div className={classes.messageWrapper}>
        <Typography className={classes.statusMessage}>
          <Typography
            variant="caption"
            style={{ color: getColor(sender._id) }}
            className={classes.statusMessageUser}
          >
            {getSenderName(sender)}
          </Typography>
          {content}
          <Typography variant="caption" component="span">
            {moment(createdAt).fromNow()}
          </Typography>
        </Typography>
      </div>
    );
  }

  return (
    <div
      className={classnames(
        classes.messageWrapper,
        isMessageFromMe && classes.messageWrapperFromMe,
      )}
    >
      <Avatar colorFrom={sender._id}>{getSenderName(sender)}</Avatar>
      <Paper className={classnames(classes.message, isMessageFromMe && classes.messageFromMe)}>
        <Typography variant="caption" style={{ color: getColor(sender._id) }}>
          {getSenderName(sender)}
        </Typography>
        {content}
        <Typography variant="caption" component="span">
          {moment(createdAt).fromNow()}
        </Typography>
      </Paper>
    </div>
  );
};

ChatMessage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  sender: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  statusMessage: PropTypes.bool,
};

ChatMessage.defaultProps = {
  statusMessage: false,
};

export default withStyles(styles)(ChatMessage);
