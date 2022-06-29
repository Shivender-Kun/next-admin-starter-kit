import { APPLICATION_ROUTES } from "../../constants";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  placeDetailsData: undefined,
};

// Reducer
const placeDetailsReducer = createReducer(initialState, (builder) => {
  builder.addCase(APPLICATION_ROUTES.PLACES_DETAILS, (state, action) => {
    Object.assign(state, {
      placeDetailsData: action.payload,
    });
  });
});
export default placeDetailsReducer;
