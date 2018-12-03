import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ChatHeader from './ChatHeader';
import Sidebar from './Sidebar';
import ErrorMessage from './ErrorMessage';
import InfoPaper from './InfoPaper';
import Spinner from './Spinner';
import ProgressBar from './ProgressBar';

const Chat = lazy(() => import('./Chat'));

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '64px',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  'content-shift': {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.drawerWidth,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      marginLeft: theme.drawerWidth * 0.75,
    },
  },
  overTop: {
    position: 'fixed',
    zIndex: 1101,
    width: '100%',
    height: '5px',
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.main,
    transform: 'rotate(180deg)',
  },
});

class ChatPage extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }).isRequired,
    chats: PropTypes.shape({
      my: PropTypes.array.isRequired,
      all: PropTypes.array.isRequired,
      active: PropTypes.object,
    }).isRequired,
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string.isRequired,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
    }).isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        chatId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        sender: PropTypes.object.isRequired,
        createdAt: PropTypes.string.isRequired,
      }),
    ),
    error: PropTypes.instanceOf(Error),
    isConnected: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      fetchMyChats: PropTypes.func.isRequired,
      fetchAllChats: PropTypes.func.isRequired,
      setActiveChat: PropTypes.func.isRequired,
      joinChat: PropTypes.func.isRequired,
      deleteChat: PropTypes.func.isRequired,
      leaveChat: PropTypes.func.isRequired,
      createChat: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      sendMessage: PropTypes.func.isRequired,
      socketsConnect: PropTypes.func.isRequired,
      mountChat: PropTypes.func.isRequired,
      unmountChat: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    error: null,
    messages: null,
  };

  state = {
    open: true,
  };

  componentDidMount() {
    const {
      actions: {
        fetchMyChats, fetchAllChats, setActiveChat, socketsConnect, mountChat, fetchChat,
      },
      match: {
        params: { chatId: activeChatId },
      },
    } = this.props;

    Promise.all([fetchAllChats(), fetchMyChats()])
      .then(() => socketsConnect())
      .then(() => activeChatId && fetchChat(activeChatId))
      .then((abortController) => {
        this.previousFetch = abortController;
        if (activeChatId) {
          setActiveChat(activeChatId);
          mountChat(activeChatId);
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: { params },
      actions: {
        setActiveChat, unmountChat, mountChat, fetchChat,
      },
      isFetching,
    } = this.props;
    const { params: nextParams } = nextProps.match;

    if (nextParams.chatId && params.chatId !== nextParams.chatId) {
      if (isFetching && this.previousFetch) {
        this.previousFetch.abort();
      }
      fetchChat(nextParams.chatId).then((abortController) => {
        this.previousFetch = abortController;
        setActiveChat(nextParams.chatId);
        unmountChat(params.chatId);
        mountChat(nextParams.chatId);
      });
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes, chats, messages, user, actions, error, isConnected, isFetching,
    } = this.props;

    const { open: hasShift } = this.state;

    actions.openSidebar = this.handleDrawerOpen;
    actions.closeSidebar = this.handleDrawerClose;

    return (
      <div className={classes.root}>
        {isFetching && <ProgressBar classes={{ root: classes.overTop }} />}
        <Sidebar chats={chats} actions={actions} isConnected={isConnected} open={hasShift} />
        <ChatHeader
          user={user}
          actions={actions}
          activeChat={chats.active}
          isConnected={isConnected}
          hasShift={hasShift}
        />
        <Suspense fallback={<Spinner />}>
          <main className={classNames(classes.content, hasShift && classes['content-shift'])}>
            {chats.active ? (
              <Chat
                messages={messages}
                user={user}
                actions={actions}
                isConnected={isConnected}
                hasShift={hasShift}
              />
            ) : (
              <InfoPaper />
            )}
          </main>
        </Suspense>
        <ErrorMessage error={error} />
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
