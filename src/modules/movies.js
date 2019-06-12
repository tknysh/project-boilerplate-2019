import { _ } from '../third-party';
import { fetchApi } from 'utils/api';
import { moviesUrl, singleMovieUrl } from 'constants/endpoints';
import {
  createSuccessAction,
  handleActions,
  genericApiInitialState,
  genericApiReducers,
  genericSuccessRequestReducer,
} from 'utils/redux';

const LOAD_MOVIES_PREFIX = 'loadMovies';
const actionLoadMoviesSuccess = createSuccessAction(LOAD_MOVIES_PREFIX);
const loadMoviesReducers = genericApiReducers(LOAD_MOVIES_PREFIX);

const ADD_MOVIE_PREFIX = 'addMovie';
const addMovieReducers = genericApiReducers(ADD_MOVIE_PREFIX, ADD_MOVIE_PREFIX);

const DELETE_MOVIE_PREFIX = 'deleteMovie';
const deleteMovieReducers = genericApiReducers(
  DELETE_MOVIE_PREFIX,
  DELETE_MOVIE_PREFIX
);

const initialState = {
  ...genericApiInitialState(),
  ...genericApiInitialState(ADD_MOVIE_PREFIX),
  ...genericApiInitialState(DELETE_MOVIE_PREFIX),
  items: [],
};

export default handleActions(
  {
    ...loadMoviesReducers,
    [actionLoadMoviesSuccess]: genericSuccessRequestReducer()(payload => ({
      items: payload,
    })),
    ...addMovieReducers,
    ...deleteMovieReducers,
  },
  initialState
);

export const loadMovies = () => ({
  // Types of actions to emit before and after
  types: _.keys(loadMoviesReducers),
  // Perform the fetching:
  callAPI: () => fetchApi(moviesUrl),
});

export const addMovie = ({ name, year }) => ({
  types: _.keys(addMovieReducers),
  callAPI: () =>
    fetchApi(moviesUrl, {
      method: 'post',
      data: JSON.stringify({
        name,
        year,
      }),
    }),
});

export const deleteMovie = id => ({
  types: _.keys(deleteMovieReducers),
  callAPI: () =>
    fetchApi(singleMovieUrl(id), {
      method: 'delete',
    }),
});
