import { createReducer } from "@reduxjs/toolkit";
import { navigationIndexer } from "../../constants";

// Initial State
const initialState = { value: navigationIndexer.aboutUS };

// Reducer

const reducer = createReducer(initialState, {
  SETTINGS_STATE_ACTION: (state, action) => {
    Object.assign(state, action.payload);
  },
});

export default reducer;
