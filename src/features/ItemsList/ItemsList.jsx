import React from 'react';
import { Link, _, connect } from 'third-party';
import { loadItems } from 'modules/items';
import { addToFavorites, removeFromFavorites } from 'modules/favorites';

const mapStateToProps = state => ({
  items: state.items.items,
  isLoading: state.items.isLoading,
  favorites: state.favorites.items,
});

const mapDispatchToProps = {
  loadItems,
  addToFavorites,
  removeFromFavorites,
};

const ItemsList = props => {
  React.useEffect(() => {
    props.items.length === 0 && props.loadItems();
  }, [props.items, props.dispatch]);

  return (
    <div>
      {!props.isLoading ? (
        <ul>
          {props.items.map(it => (
            <li key={it.id}>
              {it.name} ({it.year}){' '}
              {_.includes(props.favorites, it.id) ? (
                <button onClick={() => props.removeFromFavorites(it.id)}>
                  &#9733;
                </button>
              ) : (
                <button onClick={() => props.addToFavorites(it.id)}>
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

export const ItemsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsList);
