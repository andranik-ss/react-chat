import * as types from '../constants/user';
import callApi from '../utils/call-api';

export function editUser(data) {
  return (dispatch, getState) => {
    const { services: { isFetching }, auth: { token } } = getState();

    if (isFetching.editUser) {
      return Promise.resolve();
    }

    dispatch({
      type: types.EDIT_USER_REQUEST,
      payload: data
    });

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
          payload: reason
        })
      );
  };
}
