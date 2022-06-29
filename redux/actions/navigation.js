/**
 * dispatch the navgation change triggers
 */
import { SWITCH_NAVIGATION } from "./actionTypes";

export default ({ active = 1 }) =>
  (dispatch) => {
    return dispatch(SWITCH_NAVIGATION({ active }));
  };
