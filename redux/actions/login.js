import axios from "axios";
import { LOGIN_PAYLOAD, FETCHING } from "./actionTypes";
import { APPLICATION_ROUTES } from "../../constants";

export default ({ username, password, login = true }) =>
  (dispatch) => {
    const body = { username, password, login };
    axios
      .post(APPLICATION_ROUTES.USER_LOGIN, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // console.log(response);
        // const { code, message, accessToken } = response;

        dispatch(LOGIN_PAYLOAD({ response: response.data, status: 0 }));
        dispatch(FETCHING({ fetching: false }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          LOGIN_PAYLOAD({
            response: {
              data: { code: 104, message: "Invalid username/password" },
              status: 1,
            },
          })
        );
        dispatch(FETCHING({ fetching: false }));
      });
  };

/**
 * trigger user login
 * @param {String} username
 * @param {String} password
 * @param {Boolean} login
 */
export const userLogin =
  ({ email, password, login = true }) =>
  (dispatch) => {
    const body = { email, password, login };
    dispatch(FETCHING({ fetching: true }));

    axios
      .post(APPLICATION_ROUTES.USER_LOGIN, body, { headers: {} })
      .then((response) => {
        // handle the server success response
        const {
          data: { code },
        } = response;
        dispatch(LOGIN_PAYLOAD(response.data));
        dispatch(FETCHING({ fetching: false }));
      })
      .catch(() => {
        // handle no connection to the server
        dispatch(FETCHING({ fetching: false }));
      });
  };
