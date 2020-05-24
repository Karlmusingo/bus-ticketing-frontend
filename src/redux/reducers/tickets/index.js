import initialState from 'redux/initial-states/tickets';
import getTicketsReducer from './tickets';
import createTicketReducer from './createTicket';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getTicketsReducer(state, action),
  ...createTicketReducer(state, action),
});
