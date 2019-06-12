import React from 'react';
import { Route, Router, createBrowserHistory, Provider } from 'third-party';
import { store } from 'configureStore';

import { FavoritesContainer } from 'features/Favorites/Favorites';
import { MoviesListContainer } from 'features/MoviesList/MoviesList';
import { Home } from 'features/Home/Home';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router history={createBrowserHistory()}>
          <Route path="/movies-list" component={MoviesListContainer} />
          <Route path="/favorites" component={FavoritesContainer} />
          <Route exact path="/" component={Home} />
        </Router>
      </Provider>
    </div>
  );
};

export default App;
