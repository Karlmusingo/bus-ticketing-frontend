import io from "socket.io-client";

const { REACT_APP_BACKEND_URL } = process.env;

const socketIOClient = io(REACT_APP_BACKEND_URL, {
  reconnection: true,
  forceNew: true,
});

export default socketIOClient;
