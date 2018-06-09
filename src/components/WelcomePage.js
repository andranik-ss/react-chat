import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Redirect } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ErrorMessage from './ErrorMessage';

const styles = theme => ({
  content: {
    display: 'flex',
    paddingTop: '64px',
    justifyContent: 'center',
  },
  authForm: {
    marginTop: '24px',
    width: '500px',
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
  },
  tabWrapper: {
    padding: theme.spacing.unit * 3,
  },
});

class WelcomePage extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    login: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    receiveAuth: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    error: PropTypes.instanceOf(Error),
  };

  static defaultProps = {
    error: null,
  };

  state = {
    activeTab: 0,
  };

  componentDidMount() {
    this.props.receiveAuth();
  }

  handleTabChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  render() {
    const {
      classes, login, signup, isAuthenticated, error,
    } = this.props;
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
        <ErrorMessage error={error} />
      </div>
    );
  }
}

export default withStyles(styles)(WelcomePage);
