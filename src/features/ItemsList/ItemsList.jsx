import React from 'react';
import { Link, _ } from '../../third-party';
import { Store } from '../../store/Store';
import { loadItems } from '../../modules/items';
import { addToFavorites, removeFromFavorites } from '../../modules/favorites';

export const ItemsList = () => {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    state.items.length === 0 && loadItems(dispatch);
  }, [state]);

  return (
    <div>
      {!!state.items.length ? (
        <ul>
          {state.items.map(it => (
            <li key={it.id}>
              {it.name} ({it.year}){' '}
              {_.includes(state.favorites, it.id) ? (
                <button onClick={() => removeFromFavorites(dispatch, it.id)}>
                  &#9733;
                </button>
              ) : (
                <button onClick={() => addToFavorites(dispatch, it.id)}>
                  &#9734;
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading ...</div>
      )}
      <br />
      <Link to="/">Back</Link>
    </div>
  );
};
