import { createReducer } from "@reduxjs/toolkit";
import { MODAL_STATE } from "../../constants";

// Initial State
const initialState = { value: MODAL_STATE.NONE };

// Reducer
const modalStateReducer = createReducer(initialState, {
  MODAL_ACTION: (state, action) => {
    Object.assign(state, action.payload);
  },
});
export default modalStateReducer;
