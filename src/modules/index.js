import { combineReducers } from 'utils/redux';

import movies from 'modules/movies';
import favorites from 'modules/favorites';

const rootReducer = combineReducers({
  movies,
  favorites,
});

export default rootReducer;
