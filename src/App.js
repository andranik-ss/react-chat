import React from 'react';
import { withStyles } from 'material-ui/styles';
import ChatHeader from './components/ChatHeader';
import Sidebar from './components/Sidebar';
import ChatContent from './components/ChatContent';
import { chats, messages } from './mock-data';

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default
  }
});

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ChatHeader />
        <Sidebar chats={chats} />
        <ChatContent messages={messages} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
