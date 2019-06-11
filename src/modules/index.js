import { combineReducers } from 'third-party';

import items from 'modules/items';
import favorites from 'modules/favorites';

const rootReducer = combineReducers({
  items,
  favorites,
});

export default rootReducer;
