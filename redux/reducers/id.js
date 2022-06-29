import { createReducer } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  value: { id: undefined, regId: undefined },
};

// Reducer
const setIdReducer = createReducer(initialState, {
  SET_ID: (state, action) => {
    Object.assign(state, action.payload);
  },
});
export default setIdReducer;
