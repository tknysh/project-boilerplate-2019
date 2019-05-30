import React from 'react';
import { itemsInitial, itemsReducer } from '../modules/items';
import { favoritesInitial, favoritesReducer } from '../modules/favorites';

const initialState = {
  items: itemsInitial,
  favorites: favoritesInitial,
};

export const Store = React.createContext();

const reducer = ({ items, favorites }, action) => ({
  items: itemsReducer(items, action),
  favorites: favoritesReducer(favorites, action),
});

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
