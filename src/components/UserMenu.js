import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Spinner from './Spinner';

const UserProfile = lazy(() => import('./UserProfile'));

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
    this.setState({
      anchorEl: null,
      editProfile: true,
    });
  };

  render() {
    const { actions, user, isConnected } = this.props;
    const { anchorEl, editProfile } = this.state;

    return (
      <>
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
          <MenuItem onClick={this.handleOpenProfile}>Edit Profile</MenuItem>
          <MenuItem onClick={actions.logout}>Logout</MenuItem>
        </Menu>
        <Suspense fallback={<Spinner />}>
          <UserProfile
            open={editProfile}
            onClose={this.handleClose}
            editUser={actions.editUser}
            user={user}
          />
        </Suspense>
      </>
    );
  }
}

export default UserMenu;
