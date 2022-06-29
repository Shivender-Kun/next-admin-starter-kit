import { APPLICATION_ROUTES } from "../../constants";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  latitude: undefined,
  longitude: undefined,
};

// Reducer
const reducer = createReducer(initialState, (builder) => {
  builder.addCase(APPLICATION_ROUTES.GOOGLE_PLACE, (state, { data }) => {
    const { lat, lng } = data;
    state.latitude = lat;
    state.longitude = lng;
  });
});

export default reducer;
