import {
  thunkMiddleware,
  createStore,
  applyMiddleware,
  compose,
  callAPIMiddleware,
  defaultImport,
} from 'utils/redux';
// reducer
import rootReducer from 'modules';

const storeMiddleware = [thunkMiddleware, callAPIMiddleware];

let createStoreWithMiddleware;
const { persistState } = require('redux-devtools');
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(...storeMiddleware),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

/**
 * Creates a preconfigured store.
 */
export function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('modules', () => {
      const nextRootReducer = defaultImport(require('modules/index'));

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export const store = configureStore();
