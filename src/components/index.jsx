/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Container, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

import "./style.scss";
import TicketList from "./TicketList";
import CreateTicket from "./CreateTicket";
import initSocketIOClient from "../socketIO";
import getTickets from "redux/actions/tickets/getTickets";

function App() {
  const [openTicketList, setOpenTicketList] = useState(false);
  const [openCreateTicket, setOpenCreateTicket] = useState(false);
  const [tracker, setTracker] = useState({
    width: 0,
    color: "#000",
  });

  const dispatch = useDispatch();
  const { tickets, createTicket } = useSelector((state) => state.tickets);

  useEffect(() => {
    getTickets()(dispatch);
  }, []);

  // percentage < 0 => departure
  // percentage > 0 => arrival
  const updateTracker = (percentage) => {
    setTracker({
      ...tracker,
      width: percentage, // > 0 ? percentage : -percentage,
    });
  };
  initSocketIOClient(updateTracker);
  return (
    <Container className="app-container">
      <CreateTicket
        createTicket={createTicket}
        open={openCreateTicket}
        setOpen={setOpenCreateTicket}
      />
      <TicketList
        open={openTicketList}
        setOpen={setOpenTicketList}
        setOpenCreateTicket={setOpenCreateTicket}
        tickets={tickets}
      />
      <div className="app-header">
        <div className="app-title">Bus Ticketing App</div>
        <Button
          content="Purchase a ticket"
          primary
          onClick={() => setOpenCreateTicket(true)}
        />
      </div>
      <div className="bus-schedule">
        <div className="bus-tracker">
          <div className="tracker-station">
            <div className="station station-a">
              <div className="color station-color"></div>
              <div>Station A</div>
            </div>
            <div className="tracker">
              <div
                className="tracker-bar"
                style={{
                  width: `${
                    tracker.width >= 0 ? tracker.width : 100 + tracker.width
                  }%`,
                  background: tracker.width >= 0 ? "#1b5e20" : "#b71c1c",
                }}
              ></div>
            </div>
            <div className="station station-b">
              <div className="color station-color"></div>
              <div>Station B</div>
            </div>
          </div>
          <div className="tracker-label">Bus Tracker</div>
        </div>
        <div className="labels">
          <div className="label">
            <div className="color label-green"></div>
            <div className="label-text">Bus is coming</div>
          </div>
          {/* <div className="label">
            <div className="color label-yellow"></div>
            <div className="label-text">Bus is moving</div>
          </div> */}
          <div className="label">
            <div className="color label-red"></div>
            <div className="label-text">Bus is going</div>
          </div>
          {/* <div className="label">
            <div className="color label-white"></div>
            <div className="label-text">Bus station is empty</div>
          </div> */}
        </div>
      </div>

      <div className="app-footer">
        <Button
          content="Ticket of the day"
          onClick={() => setOpenTicketList(true)}
          primary
        />
      </div>
    </Container>
  );
}

export default App;
