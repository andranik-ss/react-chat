/* eslint-env jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import 'isomorphic-fetch';
import * as actions from './index';
import * as types from '../constants/user';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const data = {
  username: 'test',
  firstName: 'Ivan',
  lastName: 'Ivanov',
};

const fakeStore = {
  auth: {
    user: {
      username: 'test',
    },
    token: 'fake_token',
  },
  services: {
    isFetching: {
      editUser: false,
    },
  },
};

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    const responseMock = {
      message: 'User has been updated!',
      success: true,
      user: {
        firstName: 'Ivan',
        lastName: 'Ivanov',
        username: 'test',
      },
    };

    fetchMock.getOnce('users/me', {
      body: responseMock,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      {
        type: types.EDIT_USER_REQUEST,
        payload: data,
      },
      {
        type: types.EDIT_USER_SUCCESS,
        payload: responseMock,
      },
    ];

    const store = mockStore(fakeStore);

    return store.dispatch(actions.editUser(data)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
