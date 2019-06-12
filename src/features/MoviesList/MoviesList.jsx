import React from 'react';
import { Link, _, connect } from 'third-party';
import { AddMovieForm } from 'components/AddMovieForm/AddMovieForm';
import { loadMovies, addMovie, deleteMovie } from 'modules/movies';
import { addToFavorites, removeFromFavorites } from 'modules/favorites';
import { cancelRequest } from 'utils/api';
import { moviesUrl } from 'constants/endpoints';
import { MovieItem } from 'components/MovieItem/MovieItem';

const mapStateToProps = state => ({
  movies: state.movies.items,
  isLoading: state.movies.isPending,
  isAdding: state.movies.isAddMoviePending,
  isDeleting: state.movies.isDeleteMoviePending,
  isCanceled: state.movies.isCanceled,
  favorites: state.favorites.items,
});

const mapDispatchToProps = {
  loadMovies,
  addMovie,
  deleteMovie,
  addToFavorites,
  removeFromFavorites,
};

const MoviesList = props => {
  React.useEffect(() => {
    _.isEmpty(props.movies) && props.loadMovies();
  }, [props.movies]);

  return (
    <div>
      {!props.isLoading && !props.isDeleting ? (
        <ul>
          {props.movies.map(it => (
            <li key={it.id}>
              <MovieItem
                {...it}
                isFavorite={_.includes(props.favorites, it.id)}
                addToFavorites={props.addToFavorites}
                removeFromFavorites={props.removeFromFavorites}
                onDeleteMovie={props.deleteMovie}
                onAfterDeleteMovie={props.loadMovies}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div>
          Loading ...
          <button onClick={() => cancelRequest(moviesUrl)}>Cancel</button>
        </div>
      )}
      {props.isCanceled && <div>Request canceled</div>}
      <br />
      {props.isAdding ? (
        <div>Adding ...</div>
      ) : (
        <AddMovieForm
          submitForm={props.addMovie}
          onAfterSubmitForm={props.loadMovies}
        />
      )}
      <br />
      <br />
      <Link to="/">Back</Link>
    </div>
  );
};

export const MoviesListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesList);
