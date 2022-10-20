import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const enhancer = compose(
    applyMiddleware(
      thunk,
    ),
  );

let store;

export default function configureStore(initialState) {
  store = createStore(reducer, initialState, enhancer);
	return store;
}

export function getStore() {
  return store;
}
