import React from 'react';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withRead(WrappedComponent) {
  class WithRead extends React.Component {
    componentDidMount() {
      const {
        _id: messageId,
        user: { _id: userId },
        chatId,
        timeMessage,
        hasRead,
        readMessage,
      } = this.props;

      if (!hasRead.includes(userId) && !timeMessage) {
        this.timerId = setTimeout(() => {
          readMessage(chatId, messageId);
        }, 2000);
      }
    }

    componentWillUnmount() {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
    }

    render() {
      const { readMessage, ...props } = this.props;

      return <WrappedComponent {...props} />;
    }
  }

  WithRead.displayName = `WithRead(${getDisplayName(WrappedComponent)})`;
  return WithRead;
}

export default withRead;
