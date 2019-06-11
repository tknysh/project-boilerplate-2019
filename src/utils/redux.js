import { _, axios } from '../third-party';
import { createAction } from 'redux-actions';
export { createAction, handleActions, createActions } from 'redux-actions';

export function defaultImport(module) {
  // eslint-disable-next-line no-underscore-dangle
  if (module.__esModule && module.default) {
    return module.default;
  }
  return module;
}

export const callAPIMiddleware = ({ dispatch }) => next => async action => {
  const { types, callAPI, payload = {} } = action;

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

  try {
    const result = await callAPI();
    dispatch({
      type: successType,
      payload: _.isEmpty(payload)
        ? result
        : {
            ...result,
            ...payload,
          },
    });
  } catch (error) {
    dispatch({
      type: axios.isCancel(error) && cancelType ? cancelType : failureType,
      payload: error,
      error: true,
    });
  }
};

export const genericApiInitialState = {
  isLoading: false,
  isCanceled: false,
  error: null,
};

export const genericApiReducers = prefix => ({
  [`${prefix}/REQUEST`]: genericStartRequestReducer,
  [`${prefix}/FAILURE`]: genericFailureRequestReducer,
  [`${prefix}/CANCELED`]: genericCancelRequestReducer,
});

export const genericApiActions = prefix => [
  createAction(`${prefix}/REQUEST`),
  createAction(`${prefix}/FAILURE`),
  createAction(`${prefix}/CANCELED`),
];

export const genericSuccessRequestReducer = handlePayload => (
  state,
  action
) => ({
  ...state,
  isLoading: false,
  isCanceled: false,
  ...handlePayload(action.payload),
});

export const genericStartRequestReducer = state => ({
  ...state,
  isLoading: true,
  isCanceled: false,
});

export const genericFailureRequestReducer = (state, action) => ({
  ...state,
  error: action.payload,
  isLoading: false,
});

export const genericCancelRequestReducer = state => ({
  ...state,
  isCanceled: true,
  isLoading: false,
});
