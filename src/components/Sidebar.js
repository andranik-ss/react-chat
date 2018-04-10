import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import ExploreIcon from 'material-ui-icons/Explore';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

import ChatList from './ChatList';
import NewChatButton from './NewChatButton';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: theme.drawerWidth,
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: 'flex',
    paddingLeft: theme.spacing.unit * 3,
    // paddingRight: theme.spacing.unit * 3,
  },
  drawerCloseButton: {
    alignSelf: 'center',
  },
});

class Sidebar extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    chats: PropTypes.shape({
      my: PropTypes.array.isRequired,
      all: PropTypes.array.isRequired,
      active: PropTypes.object,
    }).isRequired,
    actions: PropTypes.shape({
      createChat: PropTypes.func.isRequired,
    }).isRequired,
    isConnected: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
  };

  state = {
    activeAction: 0,
    searchValue: '',
  };

  handleChangeActiveAction = (e, value) => this.setState({ activeAction: value });

  handleSearchValueChange = event =>
    this.setState({
      searchValue: event.target.value,
    });

  filterChats = chats =>
    chats
      .filter(chat => chat.title.toLowerCase().includes(this.state.searchValue.toLowerCase()))
      .sort((one, two) => (one.title.toLowerCase() <= two.title.toLowerCase() ? -1 : 1));

  render() {
    const {
      classes, chats, actions, isConnected, open,
    } = this.props;
    const { activeAction, searchValue } = this.state;

    return (
      <Drawer
        variant='persistent'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <TextField
            fullWidth
            margin='normal'
            placeholder='Search chats...'
            onChange={this.handleSearchValueChange}
            value={searchValue}
          />
          <IconButton className={classes.drawerCloseButton} onClick={actions.closeSidebar}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <ChatList
          chats={this.filterChats(activeAction === 0 ? chats.my : chats.all)}
          activeChat={chats.active}
          setActiveChat={actions.setActiveChat}
          disabled={!isConnected}
        />
        <NewChatButton createChat={actions.createChat} disabled={!isConnected} />
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
