import { createReducer } from "@reduxjs/toolkit";

// Initial State
const initialState = { active: 1 };

// Reducer

const reducer = createReducer(initialState, {
  SWITCH_NAVIGATION: (state, action) => {
    Object.assign(state, action.payload);
  },
});

export default reducer;
