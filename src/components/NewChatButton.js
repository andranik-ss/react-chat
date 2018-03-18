import React from 'react';
import { withStyles } from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
  newChatButton: {
    position: 'absolute',
    left: 'auto',
    right: theme.spacing.unit * 3,
    bottom: theme.spacing.unit * 3 + 48 // + bottom navigation
  },
  dialog: {
    minWidth: '200px'
  }
});

class NewChatButton extends React.Component {
  state = {
    newChat: {
      value: '',
      isValid: true
    },
    open: false
  };

  handleInputChange = event => {
    event.persist();
    const { name, value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  handleCreate = () => {
    const { newChat } = this.state;
    if (newChat.value === '') {
      return this.setState(prevState => ({
        ...prevState,
        newChat: {
          value: '',
          isValid: false
        }
      }));
    }

    this.props.createChat(this.state.newChat).then(() =>
      this.setState({
        open: false,
        newChat: ''
      })
    );
  };

  handleNewChat = () => {
    this.setState(prevState => ({
      ...prevState,
      open: !prevState.open
    }));
  };

  render() {
    const { classes } = this.props;
    const { open, newChat } = this.state;

    return (
      <React.Fragment>
        <Button
          variant='fab'
          color='primary'
          className={classes.newChatButton}
          onClick={this.handleNewChat}
        >
          <AddIcon />
        </Button>
        <Dialog
          maxWidth='xs'
          fullWidth
          open={open}
          onClose={this.handleNewChat}
        >
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
