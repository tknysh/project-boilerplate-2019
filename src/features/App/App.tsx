import React from 'react';
import {
  Route,
  Router,
  createBrowserHistory,
  Provider,
} from '../../third-party';
import { store } from '../../configureStore';

import { FavoritesContainer } from '../Favorites/Favorites';
import { ItemsListContainer } from '../ItemsList/ItemsList';
import { Home } from '../Home/Home';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router history={createBrowserHistory()}>
          <Route path="/items-list" component={ItemsListContainer} />
          <Route path="/favorites" component={FavoritesContainer} />
          <Route exact path="/" component={Home} />
        </Router>
      </Provider>
    </div>
  );
};

export default App;
