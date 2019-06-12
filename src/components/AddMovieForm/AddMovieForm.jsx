import React, { useState } from 'react';
import { _ } from 'third-party';

export const AddMovieForm = props => {
  const [movieName, setMovieName] = useState('');
  const [movieYear, setMovieYear] = useState('');

  const onAddNewMovieSubmitted = () => {
    props
      .submitForm({
        name: movieName,
        year: movieYear,
      })
      .then(props.onAfterSubmitForm);
    setMovieName('');
    setMovieYear('');
  };

  return (
    <form onSubmit={onAddNewMovieSubmitted}>
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
  );
};

AddMovieForm.defaultProps = {
  onAfterSubmitForm: _.noop,
};
