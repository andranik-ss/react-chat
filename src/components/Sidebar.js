import React from 'react';
import { withStyles } from 'material-ui/styles';

import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import BottomNavigation, {
  BottomNavigationAction
} from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import ExploreIcon from 'material-ui-icons/Explore';

import ChatList from './ChatList';
import NewChatButton from './NewChatButton';

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
  }
});

class Sidebar extends React.Component {
  state = {
    activeAction: 0
  };

  handleChangeActiveAction = (e, value) => {
    this.setState({ activeAction: value });
  };

  render() {
    const { classes, chats, setActiveChat } = this.props;
    const { activeAction } = this.state;

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
        <ChatList
          chats={activeAction === 0 ? chats.my : chats.all}
          activeId={chats.activeId}
          setActiveChat={setActiveChat}
        />
        <NewChatButton />
        <BottomNavigation
          showLabels
          value={this.state.activeAction}
          onChange={this.handleChangeActiveAction}
        >
          <BottomNavigationAction label='My Chats' icon={<RestoreIcon />} />
          <BottomNavigationAction label='Explore' icon={<ExploreIcon />} />
        </BottomNavigation>
      </Drawer>
    );
  }
}

export default withStyles(styles)(Sidebar);
