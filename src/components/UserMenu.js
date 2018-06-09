import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UserProfile from './UserProfile';

class UserMenu extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string.isRequired,
    }).isRequired,
    isConnected: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      logout: PropTypes.func.isRequired,
      editUser: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    anchorEl: null,
    editProfile: false,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, editProfile: false });
  };

  handleOpenProfile = () => {
    this.setState(prevState => ({
      ...prevState,
      editProfile: true,
    }));
  };

  render() {
    const { actions, user, isConnected } = this.props;
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup='true'
          onClick={this.handleClick}
          color='inherit'
          disabled={!isConnected}
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
            Edit Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.handleClose();
              actions.logout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
        <UserProfile
          open={this.state.editProfile}
          onClose={this.handleClose}
          editUser={actions.editUser}
          user={user}
        />
      </React.Fragment>
    );
  }
}

export default UserMenu;
