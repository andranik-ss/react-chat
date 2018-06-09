/* eslint no-underscore-dangle: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChatMessage from './ChatMessage';

const styles = theme => ({
  messagesWrapper: {
    overflowX: 'scroll',
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: '120px',
  },
  noMessages: {
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
    },
  },
});

class ChatMessageList extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string.isRequired,
    }).isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      chatId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.object.isRequired,
      createdAt: PropTypes.string.isRequired,
    })),
  };

  static defaultProps = {
    messages: null,
  };

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

    return messages && messages.length ? (
      <div
        className={classes.messagesWrapper}
        ref={(el) => {
          this.messagesWrapper = el;
        }}
      >
        {messages &&
          messages.map(message => <ChatMessage {...message} key={message._id} user={user} />)}
      </div>
    ) : (
      <Typography className={classes.noMessages} variant='display1'>
        There is no messages yet...
      </Typography>
    );
  }
}

export default withStyles(styles)(ChatMessageList);
