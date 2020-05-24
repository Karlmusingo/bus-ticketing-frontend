import React from "react";
import { Modal, Button } from "semantic-ui-react";
import "./TicketList.scss";

const TicketList = ({ open, setOpen, setOpenCreateTicket, tickets }) => {
  const { loading, data } = tickets;
  return (
    <Modal
      className="licketlist-modal"
      size="tiny"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Modal.Header className="header">Today's Ticket</Modal.Header>
      <Modal.Content scrolling>
        <div className="tickets">
          {loading && (
            <div className="ticket">
              <div className="name">Loading...</div>
            </div>
          )}
          {data.length > 0 &&
            data.reverse().map(({name, dob, _id}) => {
              return (
                <div className="ticket" key={_id}>
                  <div className="name">{name}</div>
                  <div className="dob">{dob.split('T')[0]}</div>
                </div>
              );
            })}
        </div>
      </Modal.Content>
      <Modal.Actions actions="actions">
        <Button
          content="Purchase a ticket"
          onClick={() => setOpenCreateTicket(true)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default TicketList;
