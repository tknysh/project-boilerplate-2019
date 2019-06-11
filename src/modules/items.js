import { createAction, handleActions } from 'third-party';

const actionRequestItems = createAction('items/REQUEST');
const actionSuccessItems = createAction('items/SUCCESS');
const actionFailureItems = createAction('items/FAILURE');

const initialState = {
  isLoading: false,
  items: [],
  error: null,
};

export default handleActions(
  {
    [actionRequestItems]: state => ({ ...state, isLoading: true }),
    [actionSuccessItems]: (state, action) => ({
      ...state,
      items: action.payload,
      isLoading: false,
    }),
    [actionFailureItems]: (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }),
  },
  initialState
);

export function loadItems() {
  return {
    // Types of actions to emit before and after
    types: [actionRequestItems, actionSuccessItems, actionFailureItems],
    // Perform the fetching:
    callAPI: () =>
      fetch('http://localhost:3001/movies').then(response => response.json()),
    // Arguments to inject in begin/end actions
    // payload: { libraryId: 1 }
  };
}
