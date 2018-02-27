import React from 'react';
import { withStyles } from 'material-ui/styles';

import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2
  }
});

class LoginForm extends React.Component {


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container}>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor='username'>Username</InputLabel>
          <Input
            placeholder='Type your username ...'
            id='username'
            onChange={this.handleChange('username')}
          />
        </FormControl>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor='password'>Password *</InputLabel>
          <Input
            placeholder='Type your password ...'
            id='password'
            fullWidth
            onChange={this.handleChange('password')}
          />
        </FormControl>
        <Button variant='raised' color='primary' className={classes.button}>
          LOGIN
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(LoginForm);
