import { APPLICATION_ROUTES } from "../../constants";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

// Reducer
const reducer = createReducer(initialState, (builder) => {
  builder.addCase(APPLICATION_ROUTES.DASHBOARD, (state, { data }) => {
    Object.assign(state, data);
  });
});

export default reducer;
