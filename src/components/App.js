import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrivateRoute from '../containers/PrivateRoute';
import ChatPage from '../containers/ChatPage';
import WelcomePage from '../containers/WelcomePage';
import history from '../utils/history';
import configureStore from '../store';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path='/(welcome)?' component={WelcomePage} />
          <PrivateRoute path='/chat' component={ChatPage} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
