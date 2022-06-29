import { createReducer } from "@reduxjs/toolkit";

// Initial State
const initialState = null;

// Reducer

const reducer = createReducer(initialState, {
  LOGIN_PAYLOAD: (state, action) => action.payload,
});
export default reducer;
