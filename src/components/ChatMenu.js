import React from 'react';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';

class LongMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { actions, user, isConnected } = this.props;

    let action = {};
    if (user.isCreator) {
      action = {
        name: 'Delete',
        onClick: actions.deleteChat
      };
    } else {
      action = {
        name: 'Leave',
        onClick: actions.leaveChat
      };
    }

    return (
      <React.Fragment>
        <IconButton
          aria-label='More'
          aria-owns={anchorEl ? 'chat-menu' : null}
          aria-haspopup='true'
          onClick={this.handleClick}
          color='inherit'
          disabled={!isConnected}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id='long-menu'
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
          ))}
        </Menu>
      </React.Fragment>
    );
  }
}

export default LongMenu;
