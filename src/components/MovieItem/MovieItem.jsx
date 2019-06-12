import React from 'react';
import { _ } from 'third-party';

export const MovieItem = props => {
  const onAddToFavorites = () => {
    props.addToFavorites(props.id);
  };

  const onRemoveFromFavorites = () => {
    props.removeFromFavorites(props.id);
  };

  const onDeleteButtonClicked = () => {
    props.onDeleteMovie(props.id).then(props.onAfterDeleteMovie);
  };

  return (
    <React.Fragment>
      {props.name} ({props.year}){' '}
      {props.isFavorite ? (
        <button onClick={onRemoveFromFavorites}>&#9733;</button>
      ) : (
        <button onClick={onAddToFavorites}>&#9734;</button>
      )}
      {props.onDeleteMovie && (
        <button onClick={onDeleteButtonClicked}>delete</button>
      )}
    </React.Fragment>
  );
};

MovieItem.defaultProps = {
  onAfterDeleteMovie: _.noop,
};
