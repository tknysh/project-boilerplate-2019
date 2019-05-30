import { _ } from '../third-party';

const ADD = 'FAVORITES/ADD';
const REMOVE = 'FAVORITES/REMOVE';

export const favoritesInitial = [];

export const favoritesReducer = (state, action) =>
  ({
    [ADD]: [...state, action.payload.id],
    [REMOVE]: _.without(state, action.payload.id),
  }[action.type] || state);

export const addToFavorites = (dispatch, id) => {
  dispatch({
    type: ADD,
    payload: { id },
  });
};

export const removeFromFavorites = (dispatch, id) => {
  dispatch({
    type: REMOVE,
    payload: { id },
  });
};
