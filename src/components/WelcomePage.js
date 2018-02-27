import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const styles = theme => ({
  content: {
    display: 'flex',
    paddingTop: '64px',
    justifyContent: 'center'
  },
  authForm: {
    marginTop: '24px',
    width: '500px'
  },
  tabWrapper: {
    padding: theme.spacing.unit * 3
  }
});

class WelcomePage extends React.Component {
  state = {
    tab: 0
  };

  handleTabChange = (event, tab) => {
    this.setState({ tab });
  };

  handleChangeIndex = index => {
    this.setState({ tab: index });
  };

  render() {
    const { classes } = this.props;
    const { tab } = this.state;

    return (
      <div>
        <AppBar color='primary'>
          <Toolbar>
            <Typography variant='title' color='inherit' noWrap>
              DogeCodes React Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <Paper className={classes.authForm}>
            <AppBar position='static' color='default'>
              <Tabs
                value={this.state.tab}
                onChange={this.handleTabChange}
                indicatorColor='red'
                fullWidth
              >
                <Tab label='LOGIN' />
                <Tab label='SIGN UP' />
              </Tabs>
            </AppBar>
            <div className={classes.tabWrapper}>
              {tab === 0 && <LoginForm />}
              {tab === 1 && <SignUpForm />}
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(WelcomePage);
