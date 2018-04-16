import React from 'react';
import { withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import Input, { InputAdornment } from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Send from 'material-ui-icons/Send';

const styles = () => ({
  root: {
    padding: 0,
    alignItems: 'center',
  },
  sendIcon: {
    alignSelf: 'flex-end',
  },
});

class MessageInput extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    sendMessage: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };
  state = {
    value: '',
  };

  onClickSendMessage = () => {
    const { value } = this.state;

    if (value) {
      this.props.sendMessage(value);
      this.setState({ value: '' });
    }
  };

  handleValueChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleKeyPress = (event) => {
    if (event.ctrlKey && event.charCode === 13) {
      this.onClickSendMessage();
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Input
        fullWidth
        placeholder='Type your message…'
        value={this.state.value}
        onChange={this.handleValueChange}
        onKeyPress={this.handleKeyPress}
        disabled={this.props.disabled}
        multiline
        endAdornment={
          <InputAdornment position='end' classes={{ root: classes.sendIcon }}>
            <IconButton aria-label='Send message' onClick={this.onClickSendMessage}>
              <Send />
            </IconButton>
          </InputAdornment>
        }
        classes={{ root: classes.root }}
      />
    );
  }
}

export default withStyles(styles)(MessageInput);
