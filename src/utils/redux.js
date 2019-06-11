import { _ } from '../third-party';

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

  const [requestType, successType, failureType] = types.map(type =>
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
      type: failureType,
      payload: error,
      error: true,
    });
  }
};
