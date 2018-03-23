import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class UserProfile extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
  };

  state = {
    username: '',
    firstName: '',
    lastName: '',
  };

  componentWillReceiveProps(nextProps) {
    const { user: { username, lastName, firstName } } = nextProps;

    this.setState({
      username,
      firstName,
      lastName,
    });
  }

  handleInputChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleCancel = () => {
    const { user: { username, lastName, firstName } } = this.props;

    this.props.onClose();
    this.setState({
      username,
      firstName,
      lastName,
    });
  };

  handleSave = () => {
    const { editUser, onClose } = this.props;

    onClose();
    editUser(this.state);
  };

  render() {
    const { username, firstName, lastName } = this.state;
    const { open, onClose } = this.props;

    return (
      <Dialog maxWidth="xs" open={open} onClose={onClose}>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            required
            label="Username"
            placeholder="Type your username ..."
            name="username"
            margin="normal"
            value={username}
            onChange={this.handleInputChange}
          />
          <TextField
            fullWidth
            label="First name"
            placeholder="Type your first name ..."
            name="firstName"
            margin="normal"
            value={firstName}
            onChange={this.handleInputChange}
          />
          <TextField
            fullWidth
            label="Last name"
            placeholder="Type your last name ..."
            name="lastName"
            margin="normal"
            value={lastName}
            onChange={this.handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default UserProfile;
