import React from 'react';
import { Link, _ } from '../../third-party';
import { Store } from '../../store/Store';
import { loadItems } from '../../modules/items';
import { removeFromFavorites } from '../../modules/favorites';

export const Favorites = () => {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    state.items.length === 0 && loadItems(dispatch);
  }, [state]);

  const filteredItems = _.reduce(
    state.items,
    (acc, it) => (_.includes(state.favorites, it.id) ? [...acc, it] : acc),
    []
  );

  return (
    <div>
      Favorites
      <br />
      <ul>
        {_.map(filteredItems, it => (
          <li key={it.id}>
            {it.name} ({it.year}) &nbsp;
            <button onClick={() => removeFromFavorites(dispatch, it.id)}>
              remove
            </button>
          </li>
        ))}
      </ul>
      <br />
      {!!state.items.length && !state.favorites.length && (
        <div>
          No Favorites
          <br />
        </div>
      )}
      {!state.items.length && (
        <div>
          Loading ...
          <br />
        </div>
      )}
      <br />
      <Link to="/">Back</Link>
    </div>
  );
};
