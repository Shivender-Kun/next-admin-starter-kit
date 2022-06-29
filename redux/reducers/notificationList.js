import { APPLICATION_ROUTES } from "../../constants";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  usersInfo: undefined,
};

// Reducer

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(APPLICATION_ROUTES.NOTIFICATION_LIST, (state, action) => {
    Object.assign(state, {
      usersInfo: action.payload,
    });
  });
});

export default reducer;
