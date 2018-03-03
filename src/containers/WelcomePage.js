import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WelcomePage from '../components/WelcomePage';
import { login, signup, receiveAuth } from '../actions';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      signup,
      receiveAuth
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
