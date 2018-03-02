import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Redirect } from 'react-router-dom';
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
    activeTab: 0
  };

  handleTabChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  render() {
    const { classes, login, signup, isAuthenticated } = this.props;
    const { activeTab } = this.state;

    if (isAuthenticated) {
      return <Redirect to='/chat' />;
    }

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
                value={activeTab}
                onChange={this.handleTabChange}
                indicatorColor='red'
                fullWidth
              >
                <Tab label='LOGIN' />
                <Tab label='SIGN UP' />
              </Tabs>
            </AppBar>
            <div className={classes.tabWrapper}>
              {activeTab === 0 && <LoginForm onSubmit={login} />}
              {activeTab === 1 && <SignUpForm onSubmit={signup} />}
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(WelcomePage);
