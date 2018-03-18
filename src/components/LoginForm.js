import React from 'react';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  button: {
    marginTop: theme.spacing.unit * 2
  }
});

class LoginForm extends React.Component {
  state = {
    username: {
      value: '',
      isValid: true
    },
    password: {
      value: '',
      isValid: true
    }
  };

  handleInputChange = event => {
    event.persist();
    const { name, value } = event.target;
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        value
      }
    }));
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password } = this.state;

    this.props.onSubmit(username.value, password.value);
  };

  render() {
    const { classes } = this.props;
    const { username, password } = this.state;

    return (
      <form className={classes.container} onSubmit={this.handleSubmit}>
        <TextField
          fullWidth
          required
          label='Username'
          placeholder='Type your username ...'
          name='username'
          margin='normal'
          username={username.value}
          onChange={this.handleInputChange}
          error={!username.isValid}
        />
        <TextField
          fullWidth
          required
          label='Password'
          placeholder='Type your password ...'
          name='password'
          type='password'
          margin='normal'
          username={password.value}
          onChange={this.handleInputChange}
          error={!password.isValid}
        />
        <Button
          variant='raised'
          color='primary'
          className={classes.button}
          type='submit'
        >
          Login
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(LoginForm);
