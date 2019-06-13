// import
import { _, axios } from 'third-party';
import { createAction } from 'redux-actions';
import { fetchApi } from 'utils/api';

export function defaultImport(module) {
  // eslint-disable-next-line no-underscore-dangle
  if (module.__esModule && module.default) {
    return module.default;
  }
  return module;
}

export const callAPIMiddleware = ({ dispatch }) => next => async action => {
  let { types, url, data, method } = action;

  if (!types) {
    // Normal action: pass it on
    return next(action);
  }

  const callAPI =
    action.callAPI ||
    (() =>
      fetchApi(url, {
        method,
        data,
      }));

  const [successType, requestType, failureType, cancelType] = types.map(type =>
    typeof type === String ? type : type.toString()
  );

  dispatch({
    type: requestType,
  });

  let result;
  try {
    result = await callAPI();
    dispatch({
      type: successType,
      payload: result,
    });
  } catch (error) {
    result = error;
    dispatch({
      type: axios.isCancel(error) && cancelType ? cancelType : failureType,
      payload: error,
      error: true,
    });
  }
  return result;
};

export function ReduxApiActionsBuilder(initialState, initialReducers) {
  let state = initialState;
  let reducers = initialReducers;

  const updateState = actionState => {
    state = { ...state, ...actionState };
  };

  const updateReducers = apiReducers => {
    reducers = { ...reducers, ...apiReducers };
  };

  return {
    getState: () => state,
    getReducers: () => reducers,
    createAction: fn => {
      const options = fn.apply(null, arguments);

      const namespace = options.namespace;

      const initialStoreState = options.initialState || genericApiInitialState;

      if (_.isObjectLike(initialStoreState)) {
        updateState(initialStoreState);
      } else if (_.isFunction(initialStoreState)) {
        updateState(initialStoreState(namespace));
      } else {
        throw new Error(
          'Property state inside `createAction` method is neither object nor function!'
        );
      }

      const apiReducers = genericApiReducers(
        namespace,
        options.onSuccess,
        namespace
      );

      updateReducers(apiReducers);

      return (...args) => ({
        types: _.keys(apiReducers),
        ...fn.apply(null, args),
      });
    },
  };
}

export const genericApiInitialState = (storeValuePrefix = '') => ({
  [_.camelCase(`is ${storeValuePrefix} Pending`)]: false,
  [_.camelCase(`is ${storeValuePrefix} Canceled`)]: false,
  [_.camelCase(`${storeValuePrefix} Error`)]: null,
});

const SUCCESS = 'SUCCESS';
const REQUEST = 'REQUEST';
const FAILURE = 'FAILURE';
const CANCELED = 'CANCELED';

export const genericApiReducers = (
  actionNamePrefix,
  onSuccess,
  storeValuePrefix = ''
) => ({
  [`${actionNamePrefix}/${SUCCESS}`]: genericSuccessRequestReducer(
    storeValuePrefix
  )(onSuccess),
  [`${actionNamePrefix}/${REQUEST}`]: genericStartRequestReducer(
    storeValuePrefix
  ),
  [`${actionNamePrefix}/${FAILURE}`]: genericFailureRequestReducer(
    storeValuePrefix
  ),
  [`${actionNamePrefix}/${CANCELED}`]: genericCancelRequestReducer(
    storeValuePrefix
  ),
});

export const genericSuccessRequestReducer = (
  storeValuePrefix = ''
) => handlePayload => (state, action) => ({
  ...state,
  [_.camelCase(`is ${storeValuePrefix} Pending`)]: false,
  [_.camelCase(`is ${storeValuePrefix} Canceled`)]: false,
  ...(handlePayload ? handlePayload(action.payload, state) : {}),
});

export const genericStartRequestReducer = (storeValuePrefix = '') => state => ({
  ...state,
  [_.camelCase(`is ${storeValuePrefix} Pending`)]: true,
  [_.camelCase(`is ${storeValuePrefix} Canceled`)]: false,
});

export const genericFailureRequestReducer = (storeValuePrefix = '') => (
  state,
  action
) => ({
  ...state,
  [_.camelCase(`${storeValuePrefix} Error`)]: action.payload,
  [_.camelCase(`is ${storeValuePrefix} Pending`)]: false,
});

export const genericCancelRequestReducer = (
  storeValuePrefix = ''
) => state => ({
  ...state,
  [_.camelCase(`is ${storeValuePrefix} Canceled`)]: true,
  [_.camelCase(`is ${storeValuePrefix} Pending`)]: false,
});

export const createSuccessAction = actionNamePrefix =>
  createAction(`${actionNamePrefix}/${SUCCESS}`);
export const createRequestAction = actionNamePrefix =>
  createAction(`${actionNamePrefix}/${REQUEST}`);
export const createFailureAction = actionNamePrefix =>
  createAction(`${actionNamePrefix}/${FAILURE}`);
export const createCanceledAction = actionNamePrefix =>
  createAction(`${actionNamePrefix}/${CANCELED}`);

// export
export { createAction, handleActions, createActions } from 'redux-actions';
export { combineReducers, createStore, applyMiddleware, compose } from 'redux';
export { default as thunkMiddleware } from 'redux-thunk';
