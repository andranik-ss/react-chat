import * as types from '../constants/user';
import callApi from '../utils/call-api';

export function editUser(data) {
  return (dispatch, getState) => {
    dispatch({
      type: types.EDIT_USER_REQUEST,
      payload: data
    });

    const { token } = getState().auth;

    return callApi(
      '/users/me',
      token,
      { method: 'POST' },
      { data: { ...data } }
    )
      .then(json => {
        dispatch({
          type: types.EDIT_USER_SUCCESS,
          payload: json
        });
      })
      .catch(reason =>
        dispatch({
          type: types.EDIT_USER_FAILURE,
          error: reason
        })
      );
  };
}
