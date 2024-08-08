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

export function setLoginOpen(state) {
  return {
    type: types.SET_LOGIN_OPEN,
    data: state
  }
}

export function setRegisterOpen(state) {
  return {
    type: types.SET_REGISTER_OPEN,
    data: state
  }
}

