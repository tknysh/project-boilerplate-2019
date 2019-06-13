// import { _ } from 'third-party';
import { moviesUrl, singleMovieUrl } from 'constants/endpoints';
import { handleActions, ReduxApiActionsBuilder } from 'utils/redux';

const initialState = {
  items: [],
};

const reducers = {
  // your reducers go here
};

const apiActionsBuilder = ReduxApiActionsBuilder(initialState, reducers);

export const loadMovies = apiActionsBuilder.createAction(a => ({
  namespace: 'loadMovies',
  // = = =
  // initialState (default: initialState = genericApiInitialState)
  // `initialState` can be passed explicitly and can be either object
  // or function. function will be executed with a `namespace` passed as
  // a first parameter
  // = = =
  onSuccess: (result, state) => ({ items: result }),
  // `onSuccess` is a function that receives result of api call in `result` argument
  // and current state in `state`
  // result of this function is a new state value to be merged into redux state
  method: 'get',
  url: moviesUrl,
  // = = =
  // data: JSON.stringify(someDataObject),
  // = = =
  // callApi: () => fetchApi('http://....', options),
  // if you use `callApi` parameter the `method`, `url` and `data` need
  // to be passed inside `options` parameter with other http options you
  // need to apply to request
}));

export const addMovie = apiActionsBuilder.createAction(({ name, year }) => ({
  namespace: 'addMovie',
  url: moviesUrl,
  method: 'post',
  data: JSON.stringify({
    name,
    year,
  }),
}));

export const deleteMovie = apiActionsBuilder.createAction(id => ({
  namespace: 'deleteMovie',
  method: 'delete',
  url: singleMovieUrl(id),
}));

export default handleActions(
  apiActionsBuilder.getReducers(),
  apiActionsBuilder.getState()
);
