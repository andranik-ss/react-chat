import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import BottomNavigation, {
  BottomNavigationAction
} from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import ExploreIcon from 'material-ui-icons/Explore';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const drawerWidth = 320;

const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%'
  },
  appBar: {
    position: 'absolute',
    width: `calc(100% - ${drawerWidth}px)`
  },
  'appBar-left': {
    marginLeft: drawerWidth
  },
  'appBar-right': {
    marginRight: drawerWidth
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  drawerBar: {
    position: 'absolute',
    width: drawerWidth,
    boxShadow: 'none',
    borderBottom: '1px solid #E0E0E0',
    backgroundColor: '#fff'
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    justifyContent: 'space-between'
  },
  bottomNav: {
    width: drawerWidth
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: '72px',
    right: '24px'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  }
});

class App extends React.Component {
  state = {
    value: 0
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.appFrame}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant='title' color='inherit' noWrap>
              DogeCodes React Chat
            </Typography>
            <IconButton aria-haspopup='true' color='inherit'>
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <AppBar className={classes.drawerBar} color='default'>
            <Toolbar>
              <TextField fullWidth placeholder='Search chats ...' />
            </Toolbar>
          </AppBar>
          <div />
          <Button
            variant='fab'
            color='primary'
            aria-label='add'
            className={classes.floatingActionButton}
          >
            <AddIcon />
          </Button>
          <BottomNavigation value={value} showLabels>
            <BottomNavigationAction label='My chats' icon={<RestoreIcon />} />
            <BottomNavigationAction label='Favorites' icon={<ExploreIcon />} />
          </BottomNavigation>
        </Drawer>
        <main className={classes.content}>
          <Paper style={{ width: '350px', padding: '25px', position: 'absolute', alignSelf: 'center' }}>
            <Typography variant='display1'>{'Start messaging…'}</Typography>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography style={{ marginTop: '10px' }}>
                {'Use Global to explore communities around here.'}
              </Typography>
              <Typography>
                {'Use Recents to see your recent conversations.'}
              </Typography>
            </div>
          </Paper>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
