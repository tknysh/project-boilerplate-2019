import React, { useState } from 'react';
import { Link, _, connect } from 'third-party';
import { loadMovies, addMovie, deleteMovie } from 'modules/movies';
import { addToFavorites, removeFromFavorites } from 'modules/favorites';
import { cancelRequest } from 'utils/api';
import { moviesUrl } from 'constants/endpoints';

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
  const [movieName, setMovieName] = useState('');
  const [movieYear, setMovieYear] = useState('');

  React.useEffect(() => {
    props.movies.length === 0 && props.loadMovies();
  }, [props.movies, props.dispatch]);

  const onAddNewMovie = event => {
    event.preventDefault();
    props
      .addMovie({
        name: movieName,
        year: movieYear,
      })
      .then(() => {
        setMovieName('');
        setMovieYear('');
        props.loadMovies();
      });
  };

  const onDeleteMovie = id => {
    props.deleteMovie(id).then(props.loadMovies);
  };

  return (
    <div>
      {!props.isLoading && !props.isDeleting ? (
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
              <button onClick={onDeleteMovie.bind(this, it.id)}>delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          Loading ...
          <button onClick={() => cancelRequest(moviesUrl, true)}>Cancel</button>
        </div>
      )}
      {props.isCanceled && <div>Request canceled</div>}
      <br />
      {props.isAdding ? (
        <div>Adding ...</div>
      ) : (
        <form onSubmit={onAddNewMovie}>
          <label>
            Name:
            <input
              type="text"
              value={movieName}
              onChange={event => setMovieName(event.target.value)}
            />
          </label>
          <label>
            Year:
            <input
              type="text"
              value={movieYear}
              onChange={event => setMovieYear(event.target.value)}
            />
          </label>
          <input type="submit" value="Add" />
        </form>
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
