import { createReducer } from "@reduxjs/toolkit";

// Initial State
const initialState = { value: { id: undefined } };

// Reducer
const placeIdReducer = createReducer(initialState, {
  SET_PLACE_ID: (state, action) => {
    Object.assign(state, action.payload);
  },
});
export default placeIdReducer;
