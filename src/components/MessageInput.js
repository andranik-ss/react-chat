import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';

const styles = () => ({
  root: {
    padding: 0,
    alignItems: 'center',
  },
  sendIcon: {
    alignSelf: 'flex-end',
    marginBottom: '10px',
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
    const { sendMessage } = this.props;

    if (value) {
      sendMessage(value);
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
    const { classes, disabled } = this.props;
    const { value } = this.state;

    return (
      <Input
        fullWidth
        placeholder='Type your message…'
        value={value}
        onChange={this.handleValueChange}
        onKeyPress={this.handleKeyPress}
        disabled={disabled}
        multiline
        endAdornment={(
          <InputAdornment position='end' classes={{ root: classes.sendIcon }}>
            <IconButton aria-label='Send message' onClick={this.onClickSendMessage}>
              <Send />
            </IconButton>
          </InputAdornment>
)}
        classes={{ root: classes.root }}
        disableUnderline
      />
    );
  }
}

export default withStyles(styles)(MessageInput);
