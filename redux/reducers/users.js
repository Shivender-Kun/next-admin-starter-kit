import { APPLICATION_ROUTES } from "../../constants";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  page: 1,
  limit: 10,
  total: 0,
  size: 0,
};

// Reducer

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(APPLICATION_ROUTES.USERS, (state, { data }) => {
    Object.assign(state, data);
  });
});

export default reducer;
