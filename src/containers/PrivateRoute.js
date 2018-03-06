import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { receiveAuth } from '../actions';

class PrivateRoute extends React.Component {
  componentDidMount() {
    this.props.receiveAuth();
  }

  render() {
    const {
      component: Component,
      isAuthenticated,
      ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/welcome',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
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
