import React from 'react';
import Input from 'material-ui/Input';

class MessageInput extends React.Component {
  state = {
    value: ''
  };

  handleValueChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleKeyPress = event => {
    const { value } = this.state;

    if (event.key === 'Enter' && value) {
      this.props.sendMessage(value);
      this.setState({ value: '' });
    }
  };

  render() {
    return (
      <Input
        fullWidth
        placeholder='Type your message…'
        value={this.state.value}
        onChange={this.handleValueChange}
        onKeyPress={this.handleKeyPress}
        disabled={this.props.disabled}
      />
    );
  }
}

export default MessageInput;
