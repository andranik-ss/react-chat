import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { receiveAuth } from '../actions';
import ProgressBar from '../components/ProgressBar';

class PrivateRoute extends React.Component {
  componentDidMount() {
    this.props.receiveAuth();
  }

  render() {
    const {
      component: Component,
      isAuthenticated,
      sendingAuthCheckRequest,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          (isAuthenticated && sendingAuthCheckRequest && <ProgressBar />) ||
          (isAuthenticated &&
            !sendingAuthCheckRequest && <Component {...props} />) ||
          (!isAuthenticated && (
            <Redirect
              to={{
                pathname: '/welcome',
                state: { from: props.location }
              }}
            />
          ))
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  sendingAuthCheckRequest: state.auth.sendingAuthCheckRequest
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      receiveAuth
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
);
