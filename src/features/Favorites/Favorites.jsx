import React from 'react';
import { Link, _, connect } from 'third-party';
import { loadItems } from 'modules/items';
import { removeFromFavorites } from 'modules/favorites';

const mapStateToProps = state => ({
  items: state.items.items,
  favorites: state.favorites.items,
});

const mapDispatchToProps = {
  loadItems,
  removeFromFavorites,
};

const Favorites = props => {
  React.useEffect(() => {
    props.items.length === 0 && props.loadItems();
  }, [props.items]);

  const filteredItems = _.reduce(
    props.items,
    (acc, it) => (_.includes(props.favorites, it.id) ? [...acc, it] : acc),
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
            <button onClick={() => props.removeFromFavorites(it.id)}>
              remove
            </button>
          </li>
        ))}
      </ul>
      <br />
      {!!props.items.length && !props.favorites.length && (
        <div>
          No Favorites
          <br />
        </div>
      )}
      {!props.items.length && (
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

export const FavoritesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
