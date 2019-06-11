import { _ } from '../third-party';
import { fetchApi } from 'utils/api';
import { loadMoviesUrl } from 'constants/endpoints';
import {
  createAction,
  handleActions,
  genericApiInitialState,
  genericApiReducers,
  genericSuccessRequestReducer,
} from 'utils/redux';

const actionSuccessItems = createAction('items/SUCCESS');
const itemsApiReducers = genericApiReducers('movies.js');

const initialState = {
  ...genericApiInitialState,
  items: [],
};

export default handleActions(
  {
    ...itemsApiReducers,
    [actionSuccessItems]: genericSuccessRequestReducer(payload => ({
      items: payload,
    })),
  },
  initialState
);

export function loadMovies() {
  return {
    // Types of actions to emit before and after
    types: [actionSuccessItems, ..._.keys(itemsApiReducers)],
    // Perform the fetching:
    callAPI: () => fetchApi(loadMoviesUrl),
    // Arguments to inject to end actions
    // payload: { libraryId: 1 }
  };
}
