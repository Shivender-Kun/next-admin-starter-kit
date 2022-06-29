import { createReducer } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  code: undefined,
  message: undefined,
};

// Reducer

const reducer = createReducer(initialState, {
  API_MESSAGE: (state, action) => {
    Object.assign(state, action.payload);
  },
});

export default reducer;
