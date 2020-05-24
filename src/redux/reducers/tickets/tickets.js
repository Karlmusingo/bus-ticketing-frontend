import {
  GET_TICKETS_START,
  GET_TICKETS_SUCCESS,
  GET_TICKETS_ERROR,
} from '../../action-types/tickets';

export default (state, { type, payload }) => {
  switch (type) {
    case GET_TICKETS_START:
      return {
        ...state,
        tickets: {
          ...state.tickets,
          loading: true,
          error: null,
        },
      };
    case GET_TICKETS_ERROR:
      return {
        ...state,
        tickets: {
          ...state.tickets,
          error: payload.error,
          loading: false,
          success: false,
        },
      };
    case GET_TICKETS_SUCCESS:
      return {
        ...state,
        tickets: {
          ...state.tickets,
          ...payload,
          success: true,
          loading: false,
          error: null,
        },
      };
    default:
      return null;
  }
};
