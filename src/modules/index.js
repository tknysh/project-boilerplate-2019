import { combineReducers } from 'third-party';

import movies from 'modules/movies';
import favorites from 'modules/favorites';

const rootReducer = combineReducers({
  movies,
  favorites,
});

export default rootReducer;
