import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import Avatar from './Avatar';

const styles = theme => ({
  activeItem: {
    backgroundColor: theme.palette.grey[200],
  },
  badge: {
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900]
    }`,
  },
});

const ChatListItem = ({
  classes, disabled, title, chatId, active, createdAt, unread,
}) => (
  <ListItem
    button
    component={Link}
    to={`/chat/${chatId}`}
    className={active ? classes.activeItem : ''}
    disabled={disabled}
  >
    {unread > 0 ? (
      <Badge classes={{ badge: classes.badge }} badgeContent={unread} color='secondary'>
        <Avatar colorFrom={chatId}>{title}</Avatar>
      </Badge>
    ) : (
      <Avatar colorFrom={chatId}>{title}</Avatar>
    )}
    <ListItemText primary={title} secondary={moment(createdAt).fromNow()} />
  </ListItem>
);

ChatListItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  unread: PropTypes.number.isRequired,
};

export default withStyles(styles)(ChatListItem);
