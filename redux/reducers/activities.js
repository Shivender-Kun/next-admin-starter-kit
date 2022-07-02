import { APPLICATION_ROUTES } from "../../constants";
import { createReducer } from "@reduxjs/toolkit";
import { ACTIVITY_EDIT } from "../actions/actionTypes";

const initialState = {
  list: [],
  page: 1,
  limit: 10,
  total: 0,
  size: 0,
};

// Reducer

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(APPLICATION_ROUTES.ACTIVITIES, (state, action) => {
      Object.assign(state, action.data);
    })
    .addCase(ACTIVITY_EDIT, (state, action) => {
      Object.assign(state, action.payload);
    });
});

export default reducer;
