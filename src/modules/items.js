const LOAD_ITEMS = 'ITEMS/LOAD';

export const itemsInitial = [];

export const itemsReducer = (state, action) => {
  return (
    {
      [LOAD_ITEMS]: action.payload.items,
    }[action.type] || state
  );
};

export const loadItems = dispatch => {
  const items = [
    {
      id: 1,
      name: 'Raiders of the Lost Ark',
      year: 1981,
    },
    {
      id: 2,
      name: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      id: 3,
      name: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    {
      id: 4,
      name: 'Die Hard',
      year: 1988,
    },
    {
      id: 5,
      name: 'Gladiator',
      year: 2000,
    },
  ];
  setTimeout(
    () =>
      dispatch({
        type: LOAD_ITEMS,
        payload: { items },
      }),
    1000
  );
};
