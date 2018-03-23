/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import ChatMessage from './ChatMessage';

const styles = theme => ({
  messagesWrapper: {
    overflowX: 'scroll',
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: '120px',
  },
});

class ChatMessageList extends Component {
  componentDidMount() {
    this.scrollDownMessageHistory();
  }

  componentDidUpdate() {
    this.scrollDownMessageHistory();
  }

  scrollDownMessageHistory = () => {
    if (this.messagesWrapper) {
      this.messagesWrapper.scrollTop = this.messagesWrapper.scrollHeight;
    }
  };

  render() {
    const { classes, messages, user } = this.props;

    return (
      <div
        className={classes.messagesWrapper}
        ref={(el) => {
          this.messagesWrapper = el;
        }}
      >
        {messages &&
          messages.map(message => <ChatMessage {...message} key={message._id} user={user} />)}
      </div>
    );
  }
}

export default withStyles(styles)(ChatMessageList);
