/**
 * dispatch the fetch action
 */
import { FETCHING } from "./actionTypes";

export default ({ fetching = false }) =>
  (dispatch) => {
    return dispatch(FETCHING({ fetching }));
  };
