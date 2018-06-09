import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  newChatButton: {
    position: 'absolute',
    left: 'auto',
    right: theme.spacing.unit * 3,
    // eslint-disable-next-line
    bottom: theme.spacing.unit * 3 + 48,
  },
  dialog: {
    minWidth: '200px',
  },
});

class NewChatButton extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    createChat: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  };

  state = {
    newChat: {
      value: '',
      isValid: true,
    },
    open: false,
  };

  handleInputChange = (event) => {
    this.setState({
      newChat: {
        value: event.target.value,
        isValid: true,
      },
    });
  };

  handleCreate = () => {
    const { newChat } = this.state;
    if (newChat.value === '') {
      return this.setState(prevState => ({
        ...prevState,
        newChat: {
          value: '',
          isValid: false,
        },
      }));
    }

    return this.props.createChat(newChat.value).then(() =>
      this.setState({
        open: false,
        newChat: {
          value: '',
          isValid: true,
        },
      }));
  };

  handleNewChat = () => {
    this.setState(prevState => ({
      ...prevState,
      open: !prevState.open,
    }));
  };

  render() {
    const { classes, disabled } = this.props;
    const { open, newChat } = this.state;

    return (
      <React.Fragment>
        <Button
          variant='fab'
          color='primary'
          className={classes.newChatButton}
          onClick={this.handleNewChat}
          disabled={disabled}
        >
          <AddIcon />
        </Button>
        <Dialog maxWidth='xs' fullWidth open={open} onClose={this.handleNewChat}>
          <DialogTitle>Create new chat</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              required
              label='New chat'
              placeholder='Type chat name ...'
              name='newChat'
              value={newChat.value}
              error={!newChat.isValid}
              onChange={this.handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCreate} color='primary'>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(NewChatButton);
