import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore() {
  // Create array with basic middlewares
  const middlewares = [thunkMiddleware];

  if (process.env.NODE_ENV === 'production') {
    // Create and return redux store
    return createStore(rootReducer, applyMiddleware(...middlewares));
  } else {
    // Add some DEV middlewares
    middlewares.push(loggerMiddleware);

    // Add Redux DevTools if browser has that extension
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ serialize: true })
      : compose;

    // Create store
    const store = createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(...middlewares))
    );

    // Add HMR for auto replace changed modules
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        store.replaceReducer(rootReducer);
      });
    }
    // Return redux store
    return store;
  }
}
