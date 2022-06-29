/**
 * The reducer for fetching event
 * @author Shivender Kumar
 * @since 30 July 2021
 */

import { createReducer } from "@reduxjs/toolkit";

// Initial State
const initialState = false;

// Reduce

const reducer = createReducer(initialState, {
  FETCHING: (state, action) => action.payload.fetching,
});

export default reducer;
