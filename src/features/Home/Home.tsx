import React from 'react';
import { Link } from '../../third-party';

export const Home: React.FC = () => {
  return (
    <ul>
      <li>
        <Link to="/items-list">Items List</Link>
      </li>
      <li>
        <Link to="/favorites">Favorites</Link>
      </li>
    </ul>
  );
};
