import React from 'react';
import { withStyles } from 'material-ui/styles';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import BottomNavigation, {
  BottomNavigationAction
} from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import ExploreIcon from 'material-ui-icons/Explore';
import AddIcon from 'material-ui-icons/Add';
import Avatar from 'material-ui/Avatar';
import titleInitials from '../utils/title-initials';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: 320
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  },
  newChatButton: {
    position: 'absolute',
    left: 'auto',
    right: theme.spacing.unit * 3,
    bottom: theme.spacing.unit * 3 + 48 // + bottom navigation
  }
});

const Sidebar = ({ classes, chats }) => {
  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <TextField fullWidth margin='normal' placeholder='Search chats...' />
      </div>
      <Divider />
      <List className={classes.chatsList}>
        {chats.map((chat, index) => (
          <ListItem key={index} button>
            <Avatar>{chat.title && titleInitials(chat.title)}</Avatar>
            <ListItemText primary={chat.title} />
          </ListItem>
        ))}
      </List>
      <Button variant='fab' color='primary' className={classes.newChatButton}>
        <AddIcon />
      </Button>
      <BottomNavigation showLabels>
        <BottomNavigationAction label='My Chats' icon={<RestoreIcon />} />
        <BottomNavigationAction label='Explore' icon={<ExploreIcon />} />
      </BottomNavigation>
    </Drawer>
  );
};

export default withStyles(styles)(Sidebar);
