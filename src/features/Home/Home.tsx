import React from 'react';
import { Link } from '../../third-party';

export const Home: React.FC = () => {
  return (
    <ul>
      <li>
        <Link to="/movies-list">Movies List</Link>
      </li>
      <li>
        <Link to="/favorites">Favorites</Link>
      </li>
    </ul>
  );
};
