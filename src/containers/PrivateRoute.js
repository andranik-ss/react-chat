import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { receiveAuth } from '../actions';
import ProgressBar from '../components/ProgressBar';

class PrivateRoute extends React.Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isChecked: PropTypes.bool.isRequired,
    receiveAuth: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { receiveAuth: checkAuth } = this.props;
    checkAuth();
  }

  render() {
    const {
      component: Component, isAuthenticated, isChecked, ...rest
    } = this.props;

    return (
      <Route
        {...rest}
        render={props => (isAuthenticated && isChecked && <Component {...props} />)
          || (isAuthenticated && !isChecked && <ProgressBar />)
          || (!isAuthenticated && (
            <Redirect
              to={{
                pathname: '/welcome',
                state: { from: props.location },
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
  isChecked: state.auth.isChecked,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    receiveAuth,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PrivateRoute),
);
