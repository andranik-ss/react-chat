/* eslint no-underscore-dangle: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import Avatar from './Avatar';
import ChatMenu from './ChatMenu';
import UserMenu from './UserMenu';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: '100%',
  },
  appBarShift: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.drawerWidth}px)`,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: `calc(100% - ${theme.drawerWidth * 0.75}px)`,
    },
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
    },
  },
  title: {
    flex: 1,
    marginLeft: theme.spacing.unit * 2,
  },
  hide: {
    display: 'none',
  },
});

const ChatHeader = ({
  classes, actions, user, activeChat, isConnected, hasShift,
}) => (
  <AppBar color='primary' className={classNames(classes.appBar, hasShift && classes.appBarShift)}>
    <Toolbar className={classes.toolbar}>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={actions.openSidebar}
        className={classNames(classes.menuButton, hasShift && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      {activeChat ? (
        <React.Fragment>
          <Avatar colorFrom={activeChat._id}>{activeChat.title}</Avatar>
          <Typography variant='title' color='inherit' className={classes.title}>
            {activeChat.title}
            {(user.isCreator || user.isMember) && (
              <ChatMenu user={user} actions={actions} isConnected={isConnected} />
            )}
          </Typography>
        </React.Fragment>
      ) : (
        <Typography variant='title' color='inherit' className={classes.title}>
          DogeCodes React Chat
        </Typography>
      )}
      <UserMenu actions={actions} user={user} isConnected={isConnected} />
    </Toolbar>
  </AppBar>
);

ChatHeader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  activeChat: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string.isRequired,
    isMember: PropTypes.bool.isRequired,
    isCreator: PropTypes.bool.isRequired,
  }).isRequired,
  isConnected: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    deleteChat: PropTypes.func.isRequired,
    leaveChat: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
  }).isRequired,
  hasShift: PropTypes.bool.isRequired,
};

ChatHeader.defaultProps = {
  activeChat: null,
};

export default withStyles(styles)(ChatHeader);
