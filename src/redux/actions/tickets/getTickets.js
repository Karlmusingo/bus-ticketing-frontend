import {
  GET_TICKETS_START,
  GET_TICKETS_SUCCESS,
  GET_TICKETS_ERROR,
} from "../../action-types/tickets";
import apiAction from "helpers/apiAction";

export default () => (dispatch) =>
  dispatch(
    apiAction({
      method: "GET",
      url: "/tickets/today",
      onStart: () => (dispatch) =>
        dispatch({
          type: GET_TICKETS_START,
        }),
      onSuccess: (data) => (dispatch) => {
        return dispatch({
          type: GET_TICKETS_SUCCESS,
          payload: {
            data: data.tickets,
          },
        });
      },
      onFailure: (error) => (dispatch) => {
        return dispatch({
          type: GET_TICKETS_ERROR,
          payload: {
            error,
          },
        });
      },
    })
  );
