import { useEffect } from "react";

import { CONNECTED, DEPARTURE, ARRIVAL, INTHEMIDDLE } from "./events";
import socketIOClient from "./socketIOClient";

export default (updateTracker) => {
  useEffect(() => {
    socketIOClient.on(CONNECTED, () => {
      console.log("User connected");
    });

    return () => {
      socketIOClient.off(CONNECTED);
    };
  }, []);

  useEffect(() => {
    socketIOClient.on(DEPARTURE, () => {
      console.log("User DEPARTURE");
      updateTracker(0);
    });

    return () => {
      socketIOClient.off(DEPARTURE);
    };
  }, []);

  useEffect(() => {
    socketIOClient.on(ARRIVAL, () => {
      console.log("User ARRIVAL");
      updateTracker(100);
    });

    return () => {
      socketIOClient.off(ARRIVAL);
    };
  }, []);

  useEffect(() => {
    socketIOClient.on(INTHEMIDDLE, (data) => {
      console.log("User INTHEMIDDLE", data);
      updateTracker(data.time);
    });
    return () => {
      socketIOClient.off(INTHEMIDDLE);
    };
  }, []);
};
