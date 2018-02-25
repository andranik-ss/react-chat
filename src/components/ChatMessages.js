import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import ChatMessage from './ChatMessage';

const styles = theme => ({
  messagesWrapper: {
    overflowX: 'scroll',
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: '120px'
  }
});

class ChatMessages extends Component {
  componentDidUpdate() {
    this.scrollDownMessageHistory();
  }

  componentDidMount() {
    this.scrollDownMessageHistory();
  }

  scrollDownMessageHistory = () => {
    this.messagesWrapper &&
      (this.messagesWrapper.scrollTop = this.messagesWrapper.scrollHeight);
  };

  render() {
    const { classes, messages } = this.props;

    return (
      <div
        className={classes.messagesWrapper}
        ref={el => {
          this.messagesWrapper = el;
        }}
      >
        {messages &&
          messages.map((message, index) => (
            <ChatMessage message={message} index={index} />
          ))}
      </div>
    );
  }
}

export default withStyles(styles)(ChatMessages);
