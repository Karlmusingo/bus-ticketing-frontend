import * as apiActionTypes from "./apiActionTypes";

export default ({
  httpOptions = {},
  url = "",
  method = "GET",
  data = null,
  queries = null,
  resType = "json",
  requireAppId = true,
  onStart = () => (dispatch) =>
    dispatch({
      type: apiActionTypes.API_REQUEST_START,
      payload: { loading: true },
    }),
  onSuccess = () => (dispatch) =>
    dispatch({
      type: apiActionTypes.API_REQUEST_SUCCESS,
      payload: { loading: false },
    }),
  onFailure = () => (dispatch) =>
    dispatch({
      type: apiActionTypes.API_REQUEST_FAILURE,
      payload: { loading: false },
    }),
  onEnd = () => (dispatch) =>
    dispatch({
      type: apiActionTypes.API_REQUEST_END,
      payload: { loading: false },
    }),
}) => {
  if (queries) {
    Object.keys(queries).forEach((key) => {
      queries[key] =
        typeof queries[key] === "string" ? queries[key].trim() : queries[key];
      return queries[key] || delete queries[key];
    });

    if (requireAppId === false) {
      data = {
        ...data,
      };
    } else {
      data = { data };
    }
  }

  return {
    type: apiActionTypes.API_REQUEST,
    payload: {
      httpOptions,
      url,
      method,
      resType,
      data: requireAppId
        ? {
            ...data,
          }
        : data,
      queries,
      onStart,
      onSuccess,
      onFailure,
      onEnd,
    },
  };
};
