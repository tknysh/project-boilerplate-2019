import React from 'react';
import { Link, _, connect } from 'third-party';
import { loadMovies } from 'modules/movies';
import { addToFavorites, removeFromFavorites } from 'modules/favorites';
import { cancelRequest } from 'utils/api';
import { loadMoviesUrl } from 'constants/endpoints';

const mapStateToProps = state => ({
  movies: state.movies.items,
  isLoading: state.movies.isLoading,
  isCanceled: state.movies.isCanceled,
  favorites: state.favorites.items,
});

const mapDispatchToProps = {
  loadMovies,
  addToFavorites,
  removeFromFavorites,
};

const MoviesList = props => {
  React.useEffect(() => {
    props.movies.length === 0 && props.loadMovies();
  }, [props.movies, props.dispatch]);

  return (
    <div>
      {!props.isLoading ? (
        <ul>
          {props.movies.map(it => (
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
        <div>
          Loading ...
          <button onClick={() => cancelRequest(loadMoviesUrl, true)}>
            Cancel
          </button>
        </div>
      )}
      {props.isCanceled && <div>Request canceled</div>}
      <br />
      <Link to="/">Back</Link>
    </div>
  );
};

export const MoviesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesList);
