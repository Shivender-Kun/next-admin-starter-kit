/**
 * dispatch an error
 */
import { ERROR } from "./actionTypes";
export default ({ error }) =>
  (dispatch) => {
    return dispatch(ERROR({ error }));
  };
