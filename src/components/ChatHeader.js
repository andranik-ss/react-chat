import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Avatar from './Avatar';
import ChatMenu from './ChatMenu';
import UserMenu from './UserMenu';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: 'calc(100% - 320px)',
  },
  title: {
    flex: 1,
    marginLeft: theme.spacing.unit * 2,
  },
});

const ChatHeader = ({
  classes, actions, user, activeChat, isConnected,
}) => (
  <AppBar color="primary" className={classes.appBar}>
    <Toolbar>
      {activeChat ? (
        <React.Fragment>
          <Avatar colorFrom={activeChat.title}>{activeChat.title}</Avatar>
          <Typography variant="title" color="inherit" className={classes.title}>
            {activeChat.title}
            {(user.isCreator || user.isMember) && (
              <ChatMenu user={user} actions={actions} isConnected={isConnected} />
            )}
          </Typography>
        </React.Fragment>
      ) : (
        <Typography variant="title" color="inherit" className={classes.title}>
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
};

ChatHeader.defaultProps = {
  activeChat: null,
};

export default withStyles(styles)(ChatHeader);
