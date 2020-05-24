/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { useDispatch } from "react-redux";
import "./CreateTicket.scss";
import createTicketAction, {
  clearCreateTicket,
} from "redux/actions/tickets/createTicket";

const CreateTicket = ({ open, setOpen, createTicket }) => {
  const dispatch = useDispatch();
  const [ticketData, setTicketData] = useState({
    name: "",
    dob: "",
  });
  const [error, setError] = useState({
    name: "",
    dob: "",
  });

  const validateForm = () => {
    const { name, dob } = ticketData;
    const nameError = name ? "" : "Please provide your name";
    const dobError = dob ? "" : "Please provide your date of birth";

    const dobValid = !isNaN(new Date(dob).getTime())
      ? ""
      : "Please provide a valid date of birth";

    const greaterThanMaxDate =
      new Date(dob).getTime() <= new Date().getTime()
        ? ""
        : "Please provide a valid date of birth";

    setError({
      ...error,
      dob: dobError || dobValid || greaterThanMaxDate,
      name: nameError,
    });
    return !!(dobError || dobValid || greaterThanMaxDate || nameError);
  };

  const submit = () => {
    if (validateForm()) {
      return false;
    }
    createTicketAction(ticketData)(dispatch);
  };

  useEffect(() => {
    if (createTicket.success) {
      clearCreateTicket()(dispatch);
      setTicketData({ dob: "", name: "" });
      setOpen(false);
    }
  }, [createTicket]);

  return (
    <Modal
      className="create-ticket-modal"
      size="tiny"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Modal.Header className="header">Today's Ticket</Modal.Header>
      <Modal.Content scrolling>
        <Form className="tickets">
          <Form.Input
            placeholder="Full name"
            name="name"
            value={ticketData.name}
            error={error.name || false}
            onChange={(_, { value }) =>
              setTicketData({ ...ticketData, name: value })
            }
          />
          <DateInput
            name="dob"
            placeholder="Date of Birth (YYYY-MM-DD)"
            icon={false}
            value={ticketData.dob}
            onChange={(_, { value }) =>
              setTicketData({ ...ticketData, dob: value })
            }
            animation="fade"
            dateFormat="YYYY-MM-DD"
            closable
            error={error.dob || false}
            initialDate={"2015-01-01"}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions actions="actions">
        <Button
          content="Proceed"
          loading={createTicket.loading}
          onClick={() => !createTicket.loading && submit()}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default CreateTicket;
