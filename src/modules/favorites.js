import { _ } from 'third-party';
import { createAction, handleActions } from 'utils/redux';

export const addToFavorites = createAction('favorites/ADD');
export const removeFromFavorites = createAction('favorites/REMOVE');

const initialState = {
  items: [],
};

export default handleActions(
  {
    [addToFavorites]: (state, { payload }) => ({
      items: [...state.movies, payload],
    }),
    [removeFromFavorites]: (state, { payload }) => ({
      items: _.without(state.movies, payload),
    }),
  },
  initialState
);
