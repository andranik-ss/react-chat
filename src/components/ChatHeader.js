import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import UserProfile from './UserProfile';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: `calc(100% - 320px)`
  },
  title: {
    flex: 1
  }
});

class ChatHeader extends React.Component {
  state = {
    anchorEl: null,
    editProfile: false
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (data) => {
    this.setState({ anchorEl: null, editProfile: false });
    if (data) {
      this.props.editUser(data)
    }
  };

  handleOpenProfile = () => {
    this.setState(prevState => ({
      ...prevState,
      editProfile: true
    }));
  };

  render() {
    const { classes, logout, user } = this.props;
    const { anchorEl } = this.state;

    return (
      <AppBar color='primary' className={classes.appBar}>
        <Toolbar>
          <Typography
            variant='title'
            color='inherit'
            noWrap
            className={classes.title}
          >
            DogeCodes React Chat
          </Typography>
          <IconButton
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup='true'
            onClick={this.handleClick}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem
              onClick={() => {
                this.handleClose();
                this.handleOpenProfile();
              }}
            >
              Edit Profile{' '}
            </MenuItem>
            <MenuItem
              onClick={() => {
                this.handleClose();
                logout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
        <UserProfile
          open={this.state.editProfile}
          onClose={this.handleClose}
          user={user}
        />
      </AppBar>
    );
  }
}

export default withStyles(styles)(ChatHeader);
