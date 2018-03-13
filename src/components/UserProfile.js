import React from 'react';
// import { withStyles } from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.user) {
      const { user: { username, lastName, firstName } } = this.props;

      this.state = {
        username,
        firstName,
        lastName
      };
    } else {
      this.state = {
        username: '',
        firstName: '',
        lastName: ''
      };
    }
  }
  
  handleInputChange = event => {
    event.persist();
    const { name, value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  handleCancel = () => {
    this.props.onClose();
  };

  handleSave = () => {
    this.props.onClose(this.state);
  };

  render() {
    const { username, firstName, lastName } = this.state;

    return (
      <Dialog maxWidth='xs' {...this.props}>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            required
            label='Username'
            placeholder='Type your username ...'
            name='username'
            margin='normal'
            value={username}
            onChange={this.handleInputChange}
          />
          <TextField
            fullWidth
            label='First name'
            placeholder='Type your first name ...'
            name='firstName'
            margin='normal'
            value={firstName}
            onChange={this.handleInputChange}
          />
          <TextField
            fullWidth
            label='Last name'
            placeholder='Type your last name ...'
            name='lastName'
            margin='normal'
            value={lastName}
            onChange={this.handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color='primary'>
            Cancel
          </Button>
          <Button onClick={this.handleSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default UserProfile;
