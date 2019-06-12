import React from 'react';
import { Link, _, connect } from 'third-party';
import { loadMovies } from 'modules/movies';
import { removeFromFavorites } from 'modules/favorites';
import { MovieItem } from 'components/MovieItem/MovieItem';

const mapStateToProps = state => ({
  movies: state.movies.items,
  favorites: state.favorites.items,
});

const mapDispatchToProps = {
  loadItems: loadMovies,
  removeFromFavorites,
};

const Favorites = props => {
  React.useEffect(() => {
    props.movies.length === 0 && props.loadItems();
  }, [props.movies]);

  const filteredItems = _.reduce(
    props.movies,
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
            <MovieItem
              {...it}
              isFavorite
              removeFromFavorites={props.removeFromFavorites}
            />
          </li>
        ))}
      </ul>
      <br />
      {!!props.movies.length && !props.favorites.length && (
        <div>
          No Favorites
          <br />
        </div>
      )}
      {!props.movies.length && (
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
