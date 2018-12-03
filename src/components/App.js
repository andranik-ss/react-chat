import React, { lazy, Suspense } from 'react';
import {
  Router, Route, Switch, Redirect,
} from 'react-router-dom';
import PrivateRoute from '../containers/PrivateRoute';
import Customize from '../containers/Customize';
import history from '../utils/history';
import ProgressBar from './ProgressBar';

const ChatPage = lazy(() => import('../containers/ChatPage'));
const WelcomePage = lazy(() => import('../containers/WelcomePage'));

const App = () => (
  <Router history={history}>
    <Suspense fallback={<ProgressBar />}>
      <Switch>
        <Route exact path='/(welcome)?' component={props => <WelcomePage {...props} />} />
        <PrivateRoute path='/chat/:chatId?' component={props => <ChatPage {...props} />} />
        <Redirect to='/' />
      </Switch>
    </Suspense>
  </Router>
);

export default Customize(App);
