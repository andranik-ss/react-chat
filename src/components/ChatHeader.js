import React from 'react';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: `calc(100% - 320px)`
  },
  title: {
    flex: 1
  }
});

const ChatHeader = ({ classes }) => {
  return (
    <AppBar color='primary' className={classes.appBar}>
      <Toolbar>
        <Typography
          variant='title'
          color='inherit'
          noWrap
          className={classes.title}
        >
          DogeCodes React Chat
        </Typography>
        <IconButton aria-haspopup='true' color='inherit'>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(ChatHeader);
