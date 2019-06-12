// import
import { _, axios } from 'third-party';
import { createAction } from 'redux-actions';

export function defaultImport(module) {
  // eslint-disable-next-line no-underscore-dangle
  if (module.__esModule && module.default) {
    return module.default;
  }
  return module;
}

export const callAPIMiddleware = ({ dispatch }) => next => async action => {
  const { types, callAPI } = action;

  if (!types) {
    // Normal action: pass it on
    return next(action);
  }

  if (typeof callAPI !== 'function') {
    throw new Error('Expected callAPI to be a function.');
  }

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
  storeValuePrefix = ''
) => ({
  [`${actionNamePrefix}/${SUCCESS}`]: genericSuccessRequestReducer(
    storeValuePrefix
  )(),
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
