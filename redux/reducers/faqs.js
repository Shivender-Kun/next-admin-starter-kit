import { APPLICATION_ROUTES } from "../../constants";
import { FAQ_STATE } from "../actions/actionTypes";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  faqsData: undefined,
};

// Reducer

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(APPLICATION_ROUTES.FAQ_LIST, (state, action) => {
      Object.assign(state, {
        faqsData: action.data,
      });
    })
    .addCase(FAQ_STATE, (state, action) => {
      Object.assign(state, {
        faqsData: action.payload,
      });
    });
});

export default reducer;
