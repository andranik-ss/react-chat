import React from 'react';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Avatar from './Avatar';
import moment from 'moment';

const styles = theme => ({
  chatsList: {
    height: 'calc(100% - 56px)',
    overflowY: 'scroll'
  },
  active: {
    backgroundColor: '#eeeeee'
  },
  itemWrapper: {
    paddingLeft: theme.spacing.unit * 2
  }
});

const ChatList = ({ classes, chats, setActiveChat, activeId }) => {
  return (
    <List className={classes.chatsList}>
      {chats.map(chat => (
        <ListItem
          className={classnames(activeId === chat._id && classes.active)}
          key={chat._id}
          component={Link}
          to={`/chat/${chat._id}`}
          button
          onClick={() => setActiveChat(chat._id)}
        >
          <Avatar colorFrom={chat._id}>{chat.title}</Avatar>
          <div className={classes.itemWrapper}>
            <ListItemText primary={chat.title} />
            <Typography variant='caption'>
              {moment(chat.createdAt).fromNow()}
            </Typography>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(ChatList);
