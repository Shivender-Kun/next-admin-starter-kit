import { createReducer } from "@reduxjs/toolkit";

// Initial State
const initialState = { value: 2 };

// Reducer

const reducer = createReducer(initialState, {
  SWITCH_NOTIFICATION_LIST: (state, action) => {
    Object.assign(state, action.payload);
  },
});

export default reducer;
