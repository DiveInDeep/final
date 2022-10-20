import * as types from './types';


export function setUser(user) {
  return {
    type: types.SET_USER,
    data: user
  };
}

export function setAuth(state) {
  return {
    type: types.SET_AUTH,
    data: state
  };
}

