import { createReducer } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  value: {
    show: false,
    src: "",
  },
};

// Reducer
const imgModalStateReducer = createReducer(initialState, {
  IMG_MODAL: (state, action) => {
    Object.assign(state, action.payload);
  },
});
export default imgModalStateReducer;
