import { APPLICATION_ROUTES } from "../../constants";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

// Reducer
const reducer = createReducer(initialState, (builder) => {
  builder.addCase(APPLICATION_ROUTES.APP_DETAILS, (state, { data }) => {
    Object.assign(state, { data: data });
  });
});

export default reducer;
