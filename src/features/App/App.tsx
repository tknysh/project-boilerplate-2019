import React from 'react';
import { Route, Router, createBrowserHistory } from '../../third-party';

import { Favorites } from '../Favorites/Favorites';
import { ItemsList } from '../ItemsList/ItemsList';
import { Home } from '../Home/Home';
import { StoreProvider } from '../../store/Store';

const App: React.FC = () => {
  return (
    <div className="App">
      <StoreProvider>
        <Router history={createBrowserHistory()}>
          <Route path="/items-list" component={ItemsList} />
          <Route path="/favorites" component={Favorites} />
          <Route exact path="/" component={Home} />
        </Router>
      </StoreProvider>
    </div>
  );
};

export default App;
