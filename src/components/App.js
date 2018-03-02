import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import ChatPage from '../containers/ChatPage';
import WelcomePage from '../containers/WelcomePage';

import configureStore from '../store';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/(welcome)?' component={WelcomePage} />
          <Route path='/chat' component={ChatPage} />
          <Redirect to='/' />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
