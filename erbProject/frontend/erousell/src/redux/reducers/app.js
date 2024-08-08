import * as types from "../actions/types";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  auth: false,
  user: {
    accessToken: null,
    userId: null,
  },
  isLoginOpen: false,
  isRegisterOpen: false,
});

const appReducer = {
  app: (state = initialState, action) => {
    switch (action.type) {
      case types.SET_AUTH:
        state = { ...state, auth: action.data };
        return state;

      case types.SET_USER:
        if (!action.data || Object.keys(action.data).length === 0) {
          state = {
            ...state,
            user: initialState.user,
          };
        } else {
          state = { ...state, user: action.data };
        }
        return state;

      case types.SET_LOGIN_OPEN:
        state = { ...state, isLoginOpen: action.data };
        return state;

      case types.SET_REGISTER_OPEN:
        state = { ...state, isRegisterOpen: action.data };
        return state;

      default:
        return state;
    }
  },
};

export default appReducer;
