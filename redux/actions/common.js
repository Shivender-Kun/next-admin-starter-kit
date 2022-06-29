/**
 * @description
 * experimental common function to  handle the commmonly
 * used redux action that handles the reducing on the
 * basis of the endpoints.
 */
import axios from "axios";
import {
  TRANSIENT_TOGGLE,
  ERROR,
  SUCCESS,
  API_MESSAGE,
  FETCHING,
} from "./actionTypes";

const headers = {
  "Content-Type": "application/json",
  Authorization: null,
};

if (typeof window !== "undefined") {
  headers.Authorization = window.localStorage.accessToken;
}
/**
 * trigger fetch entity function
 * @param {*} param0
 */
export const fetchEntity =
  ({ endpoint, payload, page, limit, custom }) =>
  (dispatch) => {
    if (!endpoint) {
      return dispatch(ERROR({ error: "Required endpoint is missing." }));
    }
    dispatch(FETCHING({ fetching: true }));
    const body = Object.assign({}, payload, { page, limit });
    // console.log(endpoint, payload, page, limit);
    axios
      .post(endpoint, body, { headers })
      .then((response) => {
        const {
          data: { code, data, size },
        } = response;
        // console.log(response);
        if (code === 100) {
          // dispatch the success along with the paginated data
          if (custom) {
            dispatch({
              type: custom,
              data,
              page,
              limit,
              size,
            });
          } else {
            dispatch({
              type: endpoint,
              data,
              page,
              limit,
              size,
            });
          }
        }
        dispatch(FETCHING({ fetching: false }));
      })
      .catch((err) => {
        console.error(err);
        dispatch(FETCHING({ fetching: false }));
        dispatch(ERROR({ error: "error while fetching entity list." }));
      });
  };

/**
 * trigger delete entity function. This function is generic to delete any entity within the
 * application. This is a generic calling function and everything
 * @param {*} param0
 * @param {Array<Function>} customDispatchers @todo pass in the array of dispatchers to pass in
 * after the action has been executed successfully.
 */
export const genericDeleteEntity =
  ({
    page = 1,
    limit = 30,
    payload,
    endpoint,
    listingEndpoint,
    customDispatchers,
  }) =>
  (dispatch) => {
    if (!(endpoint && listingEndpoint)) {
      return dispatch(
        ERROR({ error: "Required endpoint and listingEndpoint is missing." })
      );
    }
    dispatch(FETCHING({ fetching: true }));

    axios
      .post(endpoint, payload, { headers })
      .then((response) => {
        const {
          data: { code, message },
        } = response;
        if (code === 100) {
          // refresh the list.
          dispatch(
            fetchEntity({
              page,
              limit,
              endpoint: listingEndpoint,
              payload,
            })
          );
          dispatch(SUCCESS({ success: "Entity has been deleted" }));
        } else {
          // handle the API error
          dispatch(ERROR({ error: message }));
        }
        dispatch(FETCHING({ fetching: false }));
      })
      .catch((err) => {
        console.error(err);
        dispatch(FETCHING({ fetching: false }));
        dispatch(ERROR({ error: "error while fetching entity list." }));
      });
  };

export const genericBlockEntity =
  ({
    page = 1,
    limit = 30,
    payload,
    endpoint,
    listingEndpoint,
    customDispatchers,
  }) =>
  (dispatch) => {
    if (!(endpoint && listingEndpoint)) {
      return dispatch(
        ERROR({ error: "Required endpoint and listingEndpoint is missing." })
      );
    }
    dispatch(FETCHING({ fetching: true }));

    axios
      .post(endpoint, payload, { headers })
      .then((response) => {
        const {
          data: { code, message },
        } = response;
        if (code === 100) {
          // refresh the list.
          dispatch(
            fetchEntity({
              page,
              limit,
              endpoint: listingEndpoint,
            })
          );
          dispatch(SUCCESS({ success: "Entity has been blocked" }));
        } else {
          // handle the API error
          dispatch(ERROR({ error: message }));
        }
        dispatch(FETCHING({ fetching: false }));
      })
      .catch((err) => {
        console.error(err);
        dispatch(FETCHING({ fetching: false }));
        dispatch(ERROR({ error: "error while fetching entity list." }));
      });
  };

/**
 * trigger add entity functionality. This action function is generic to add
 * any new entity into the system.
 * @param {*} param0
 * @param {Array<Function>} customDispatchers contains an array of functions to
 * dispatch once the service has been executed successfully.
 */
export const genericCreateEntity =
  ({
    endpoint,
    payload,
    listingEndpoint,
    multipart = false,
    picture,
    page = 1,
    limit = 10,
    customDispatchers,
  }) =>
  (dispatch) => {
    if (!endpoint) {
      return dispatch(ERROR({ error: "Missing required property endpoint." }));
    }
    dispatch(FETCHING({ fetching: true }));
    let requestBody = payload;
    const requestHeaders = Object.assign({}, headers);

    if (multipart) {
      const formData = new FormData();

      if (picture) formData.append("picture", picture);
      formData.append("data", JSON.stringify(payload));
      requestHeaders["Content-Type"] = "multipart/form-data";
      requestHeaders["Authorization"] = localStorage.getItem("accessToken");
      requestBody = formData;
    }
    // console.log(payload);
    axios
      .post(endpoint, requestBody, { headers: requestHeaders })
      .then((response) => {
        const {
          data: { code, message },
        } = response;
        // console.log(response);
        dispatch(API_MESSAGE({ code, message }));
        if (code === 100) {
          // created
          // trigger fetch listing
          dispatch(
            fetchEntity({
              page,
              limit,
              endpoint: listingEndpoint,

              payload,
            })
          );
          dispatch(
            fetchEntity({
              page,
              limit,
              endpoint: customDispatchers,
              payload,
            })
          );
          dispatch(SUCCESS({ success: "Success!" }));
        } else {
          // handle ERRORs
          dispatch(ERROR({ error: message }));
        }
        return dispatch(FETCHING({ fetching: false }));
      })
      .catch((err) => {
        console.error(err);
        dispatch(ERROR({ error: "error while creating entity" }));
        return dispatch(FETCHING({ fetching: false }));
      });
  };

/**
 * a generic toggle function to handle the toggles
 * @param {*} param0
 */
export const genericToggle =
  ({ toggleId }) =>
  (dispatch) =>
    dispatch(TRANSIENT_TOGGLE({ toggleId }));

export const genericHitEndpoint =
  ({ endpoint, payload, customDispatchers = [] }) =>
  (dispatch) => {
    dispatch(FETCHING({ fetching: true }));
    axios.post(endpoint, payload, { headers }).then((success) => {
      const {
        data: { code, message },
      } = success;
      if (code === 100) {
        // dispatch a success message
        dispatch(
          SUCCESS({
            success:
              "Push notification have been queued and will be delivered to users one by one.",
          })
        );
      } else {
        // dispatch an error message
        dispatch(ERROR({ error: message }));
      }
      dispatch(FETCHING({ fetching: false }));
    }); // .catch(err => console.error(err));
  };

export const genericApiHit =
  ({ endpoint, payload, listingEndpoint, page = 1, limit = 30 }) =>
  (dispatch) => {
    if (!endpoint) {
      return dispatch(ERROR({ error: "Required endpoint is missing." }));
    }
    const requestBody = payload;
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.accessToken,
    };
    const requestHeaders = Object.assign({}, headers);
    dispatch(FETCHING({ fetching: true }));

    axios
      .post(endpoint, requestBody, { headers: requestHeaders })
      .then((response) => {
        const {
          data: { code, message },
        } = response;
        dispatch(API_MESSAGE({ code, message }));
        if (code === 100) {
          if (listingEndpoint) {
            dispatch(
              fetchEntity({
                page,
                limit,
                endpoint: listingEndpoint,
                payload,
              })
            );
          }
        } else {
          dispatch(ERROR({ error: message }));
        }
        dispatch(FETCHING({ fetching: false }));
      })
      .catch((err) => {
        dispatch(FETCHING({ fetching: false }));
        dispatch(ERROR({ error: "error while fetching entity list." }));
      });
  };

export const genericUpdateState =
  ({ type, value }) =>
  (dispatch) => {
    dispatch(type(value));
  };

export const nullifyError = () => (dispatch) => {
  dispatch(ERROR({ error: undefined }));
};

export const nullifySuccess = () => (dispatch) => {
  dispatch(SUCCESS({ success: undefined }));
};

export const nullifyApiMessage = () => (dispatch) => {
  dispatch(API_MESSAGE({ code: undefined, message: undefined }));
};
