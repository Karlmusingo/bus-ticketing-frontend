import {
  CREATE_TICKET_START,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_ERROR,
  CLEAR_CREATE_TICKET_STORE,
} from '../../action-types/tickets';

export default (state, { type, payload }) => {
  switch (type) {
    case CREATE_TICKET_START:
      return {
        ...state,
        createTicket: {
          ...state.createTicket,
          loading: true,
          error: null,
        },
      };
    case CREATE_TICKET_ERROR:
      return {
        ...state,
        createTicket: {
          ...state.createTicket,
          error: payload,
          loading: false,
        },
      };
    case CREATE_TICKET_SUCCESS:
      return {
        ...state,
        createTicket: {
          ...state.createTicket,
          ...payload,
          loading: false,
          success: true,
          error: null,
        },
        tickets: {
          ...state.tickets,
          data: [payload.data, ...state.tickets.data, ]
        }
      };
    case CLEAR_CREATE_TICKET_STORE:
      return {
        ...state,
        createTicket: {
          ...state.createTicket,
          ...payload,
          loading: false,
          error: null,
          success: false,
          data: null,
        },
      };

    default:
      return null;
  }
};
