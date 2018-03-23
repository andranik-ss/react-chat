import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';

class ChatMenu extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      isCreator: PropTypes.bool.isRequired,
    }).isRequired,
    isConnected: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      deleteChat: PropTypes.func.isRequired,
      leaveChat: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { actions, user, isConnected } = this.props;

    const action = {
      name: user.isCreator ? 'Delete' : 'Leave',
      onClick: user.isCreator ? actions.deleteChat : actions.leaveChat,
    };

    return (
      <React.Fragment>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'chat-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
          disabled={!isConnected}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={() => {
              action.onClick();
              this.handleClose();
            }}
          >
            {action.name}
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

export default ChatMenu;
