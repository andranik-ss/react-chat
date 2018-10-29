import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import IconButton from '@material-ui/core/IconButton';
import RestoreIcon from '@material-ui/icons/Restore';
import ExploreIcon from '@material-ui/icons/Explore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ChatList from './ChatList';
import NewChatButton from './NewChatButton';

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: theme.drawerWidth,
    [theme.breakpoints.down('md')]: {
      width: theme.drawerWidth * 0.75,
    },
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: 'flex',
    paddingLeft: theme.spacing.unit * 3,
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
      openSidebar: PropTypes.func.isRequired,
    }).isRequired,
    isConnected: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.mql = window.matchMedia('(max-width: 600px)');
    this.mql.addListener(this.screenTest);

    this.state = {
      activeAction: 0,
      searchValue: '',
      isSwipeable: this.mql.matches,
    };
  }

  componentWillUnmount = () => {
    this.mql.removeListener(this.screenTest);
  };

  screenTest = (e) => {
    const { actions } = this.props;

    this.setState({
      isSwipeable: e.matches,
    });
    if (!e.matches) {
      actions.openSidebar();
    }
  };

  handleChangeActiveAction = (e, value) => this.setState({ activeAction: value });

  handleSearchValueChange = event => this.setState({
    searchValue: event.target.value,
  });

  filterChats = (chats) => {
    const { searchValue } = this.state;

    return chats
      .filter(chat => chat.title.toLowerCase().includes(searchValue.toLowerCase()))
      .sort((one, two) => (one.title.toLowerCase() <= two.title.toLowerCase() ? -1 : 1));
  };

  render() {
    const {
      classes, chats, actions, isConnected, open,
    } = this.props;
    const { activeAction, searchValue, isSwipeable } = this.state;

    const drawerProps = isSwipeable ? {} : { variant: 'persistent' };

    return (
      <SwipeableDrawer
        {...drawerProps}
        open={open}
        onOpen={actions.openSidebar}
        onClose={actions.closeSidebar}
        classes={{
          paper: classes.drawerPaper,
        }}
        style={{ width: 0 }}
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
          disabled={!isConnected}
        />
        <NewChatButton createChat={actions.createChat} disabled={!isConnected} />
        <BottomNavigation showLabels value={activeAction} onChange={this.handleChangeActiveAction}>
          <BottomNavigationAction label='My Chats' icon={<RestoreIcon />} />
          <BottomNavigationAction label='Explore' icon={<ExploreIcon />} />
        </BottomNavigation>
      </SwipeableDrawer>
    );
  }
}

export default withStyles(styles)(Sidebar);
