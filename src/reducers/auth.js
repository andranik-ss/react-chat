import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants';

const token = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!token,
  user: null,
  token
};

export default function auth(state = initialState, action) {
  console.log(action);

  switch (action.type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      const { user, token } = action.payload;

      return { ...state, isAuthenticated: true, user, token };
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
}
