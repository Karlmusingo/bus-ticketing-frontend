import { toast } from "react-toastify";
import {
  CREATE_TICKET_START,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_ERROR,
  CLEAR_CREATE_TICKET_STORE,
} from "../../action-types/tickets";

import apiAction from "helpers/apiAction";

export default (data) => (dispatch) => {
  return dispatch(
    apiAction({
      method: "post",
      url: "/tickets",
      data,
      onStart: () => (dispatch) =>
        dispatch({
          type: CREATE_TICKET_START,
        }),
      onSuccess: (data) => (dispatch) => {
        toast.success("Ticket purchased successfully");
        return dispatch({
          type: CREATE_TICKET_SUCCESS,
          payload: {
            data: data.ticket,
          },
        });
      },
      onFailure: (error) => (dispatch) => {
        toast.error("failed to purchased, try again");
        return dispatch({
          type: CREATE_TICKET_ERROR,
          payload: {
            error,
          },
        });
      },
    })
  );
};

export const clearCreateTicket = () => (dispatch) => {
  return dispatch({
    type: CLEAR_CREATE_TICKET_STORE,
  });
} 
