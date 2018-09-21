import * as actions from "./actions";

const initialState = {
  fetching: false,
  products: null,
  error: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_PRODUCTS:
      return { ...state, fetching: true, error: null };
    case actions.PRODUCTS_FETCHED:
      return { ...state, fetching: false, products: action.products };
    case actions.API_CALL_FAILURE:
      return { ...state, fetching: false, error: action.error };
    default:
      return state;
  }
}
